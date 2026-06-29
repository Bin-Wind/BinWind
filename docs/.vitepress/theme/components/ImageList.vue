<!-- .vitepress/theme/components/ImageList.vue -->
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
})

const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.items.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleDownload = (item) => {
  // 这里实现下载逻辑
  console.log('下载:', item.title)
  // 实际项目中可以使用类似以下代码：
  // const link = document.createElement('a')
  // link.href = item.image
  // link.download = item.title + '.' + item.image.split('.').pop()
  // link.click()
}

const handleLink = (item) => {
  // 这里实现链接跳转逻辑
  console.log('查看详情:', item.title)
  // 如果item有link属性，可以这样跳转：
  if(item.link) window.open(item.link, '_blank')
}
</script>

<template>
  <div class="image-list-container">
    <div class="image-list">
      <div v-for="(item, index) in paginatedItems" :key="index" class="image-item">
        <div class="image-content">
          <img :src="item.image" :alt="item.title" class="image" />
          <div class="image-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.introduction }}</p>
            <div class="image-actions">
              <button @click="handleLink(item)" class="link-btn">查看</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<style scoped>
.image-list-container {
  margin: 20px 0;
}

.image-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.image-item {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.image-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.image-content {
  display: flex;
  align-items: center;
  padding: 15px;
}

.image {
  width: 120px;
  height: 170px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.image-info {
  flex: 1;
  text-align: left;
}

.image-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.image-info p {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.image-actions {
  display: flex;
  gap: 10px;
}

.download-btn, .link-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: 1px solid var(--vp-button-brand-border);
}

.download-btn:hover {
  background-color: var(--vp-button-brand-hover-bg);
}

.link-btn {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.link-btn:hover {
  background-color: var(--vp-c-bg-soft);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.pagination button {
  padding: 6px 15px;
  cursor: pointer;
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 4px;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: var(--vp-button-brand-hover-bg);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>