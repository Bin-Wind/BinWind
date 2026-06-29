# AI 大模型微调 | 让通用模型成为领域专家

大模型微调（Fine-tuning）是当前最核心的 AI 工程能力之一。本文将系统讲解微调的原理、方法和实战要点。

## 什么是微调

微调是在预训练大语言模型的基础上，使用特定领域或任务的数据进行二次训练。类比来说：

> **预训练模型** = 通识教育毕业的大学生  
> **微调** = 入职培训，让 ta 胜任具体岗位

## 为什么要微调

| 场景 | 示例 | 微调价值 |
|------|------|---------|
| 领域适配 | 医疗问诊、法律咨询 | 注入专业知识 |
| 格式控制 | JSON 结构化输出 | 稳定输出格式 |
| 风格定制 | 客服话术、品牌语调 | 统一语言风格 |
| 成本优化 | 7B 微调胜过 70B 通用 | 降低推理成本 |
| 数据安全 | 私有数据不能外传 | 本地化部署 |

## 微调方法全景

### 一、全量微调（Full Fine-tuning）

更新模型的所有参数。

```
优点：效果上限最高
缺点：需要大量显存（7B 模型约需 100GB+）
适用：资源充足，追求极致效果
```

### 二、参数高效微调（PEFT）

只训练少量参数，大幅降低资源门槛。

#### LoRA（Low-Rank Adaptation）
最主流的轻量微调方案，在 Attention 层旁路插入低秩矩阵。

```python
# LLaMA-Factory 中的 LoRA 配置示例
lora_rank: 8          # 低秩矩阵的秩，越大效果越好但参数越多
lora_alpha: 16        # 缩放系数，通常为 rank 的 2 倍
lora_dropout: 0.05    # 防止过拟合
lora_target: all      # 在所有线性层插入 LoRA
```

**原理简述：**
```
原始权重矩阵 W（冻结）
旁路矩阵 B × A（可训练），其中 B ∈ R^(d×r), A ∈ R^(r×k)
输出 = Wx + BAx
r 远小于 d,k，所以可训练参数量极小
```

#### QLoRA
LoRA + 4bit 量化，进一步压缩显存需求。

```
7B 模型全量微调：~100GB 显存
7B 模型 LoRA：~24GB 显存
7B 模型 QLoRA：~10GB 显存  ← 消费级显卡即可
```

#### 其他 PEFT 方法
- **Adapter**：在 Transformer 层间插入小型网络
- **Prefix Tuning**：在输入前拼接可训练的虚拟 Token
- **P-Tuning v2**：在每一层都添加可训练前缀
- **IA³**：仅训练三个缩放向量，更轻量

### 三、指令微调（Instruction Tuning）

用「指令-回答」格式的数据训练，让模型学会遵循指令。

```
输入：
"将以下文本翻译成英文：今天天气真好"

输出：
"The weather is really nice today."
```

**数据格式（ShareGPT 格式）：**
```json
{
  "conversations": [
    {"from": "human", "value": "帮我写一封请假邮件"},
    {"from": "gpt", "value": "尊敬的领导：\n您好！因身体不适..."}
  ]
}
```

### 四、RLHF / DPO

**RLHF（Reinforcement Learning from Human Feedback）**
1. 收集人类偏好数据（对同一 prompt 的多个回答排序）
2. 训练奖励模型（Reward Model）
3. 用 PPO 算法优化策略

**DPO（Direct Preference Optimization）**
- 跳过奖励模型，直接从偏好数据中优化
- 更简单、更稳定，效果不输 RLHF
- 已成为主流对齐方案

## 微调实战流程

### Step 1：明确任务
- 分类任务？生成任务？对话任务？
- 需要什么输入/输出格式？
- 评估标准是什么？

### Step 2：准备数据

**数据质量 checklist：**
- [ ] 样本多样性：覆盖各类场景，不要全是同一模板
- [ ] 答案正确性：人工抽检，确保标注准确
- [ ] 格式一致性：同一任务的输出格式应该统一
- [ ] 数量合理性：至少 100-500 条有效样本起步

**数据格式示例（Alpaca 格式）：**
```json
[
  {
    "instruction": "判断以下句子的情感倾向",
    "input": "这家餐厅的服务态度太差了",
    "output": "负面"
  }
]
```

### Step 3：选择基座模型

| 使用场景 | 推荐模型 |
|---------|---------|
| 中文任务，资源有限 | Qwen2.5-7B-Instruct |
| 追求性价比 | DeepSeek-V2-Lite |
| 英文为主 | Llama-3.1-8B-Instruct |
| 轻量级边缘部署 | Qwen2.5-1.5B / Gemma-2B |

### Step 4：配置与训练

**LLaMA-Factory 训练命令行示例：**
```bash
llamafactory-cli train \
  --model_name_or_path Qwen/Qwen2.5-7B-Instruct \
  --dataset my_dataset \
  --template qwen \
  --finetuning_type lora \
  --lora_rank 8 \
  --lora_alpha 16 \
  --output_dir ./output \
  --per_device_train_batch_size 4 \
  --gradient_accumulation_steps 4 \
  --learning_rate 2e-5 \
  --num_train_epochs 3 \
  --bf16 \
  --logging_steps 10 \
  --save_steps 500
```

### Step 5：评估与测试

```python
# 简单评估脚本思路
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("./output")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B-Instruct")

test_cases = [
    {"input": "请用一句话介绍杭州", "expected": "..."},
    # ... 更多测试用例
]

for case in test_cases:
    # 推理并对比
    pass
```

**评估维度：**
- **准确性**：答案是否正确
- **格式遵循**：输出是否符合预期格式
- **泛化能力**：未见过的样本表现如何
- **退化检测**：有没有遗忘原有能力（灾难性遗忘）

### Step 6：模型合并与导出

```bash
# LLaMA-Factory 导出合并后的模型
llamafactory-cli export \
  --model_name_or_path Qwen/Qwen2.5-7B-Instruct \
  --adapter_name_or_path ./output \
  --template qwen \
  --finetuning_type lora \
  --export_dir ./merged_model \
  --export_size 2 \
  --export_legacy_format false
```

## 常见问题与避坑指南

### 1. 过拟合
**现象：** 训练 loss 很低，但测试效果差  
**解决：** 减少 epoch、增大 lora_dropout、增加数据量

### 2. 灾难性遗忘
**现象：** 微调后模型忘了原来会的东西  
**解决：** 混合通用数据、降低学习率、减少训练轮数

### 3. 数据泄露
**现象：** 测试集和训练集有重叠  
**解决：** 严格划分数据集，去重检查

### 4. 显存不足
**解决优先级：** QLoRA → 减小 batch_size → 梯度累积 → 降低 lora_rank → 换更小模型

## 常用工具对比

| 工具 | 特点 | 适合人群 |
|------|------|---------|
| **LLaMA-Factory** | 中文友好，Web UI，方法全 | 初学者首选 |
| **Hugging Face Trainer** | 最灵活，生态最全 | 有经验的开发者 |
| **Unsloth** | 训练速度快 2-5 倍 | 追求效率 |
| **Axolotl** | 配置化，可复现 | 团队协作 |
| **Firefly** | 中文微调专用 | 中文场景 |

## 总结

- **入门推荐**：LLaMA-Factory + Qwen2.5-7B + LoRA
- **核心原则**：数据质量是第一生产力
- **迭代心态**：先跑通基线，再逐步优化

> "微调不是魔法，数据 + 实验 + 耐心 = 好模型"

后续将更新具体的 LoRA 调参实验、多卡训练配置、生产环境部署等内容。
