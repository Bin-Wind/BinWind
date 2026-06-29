# 经典书籍

<ClientOnly>
  <ImageList :items="[
    { 
      image: '/classic_book/001.jpg', 
      title: '《百年孤独》- 加西亚·马尔克斯', 
      introduction: '以布恩迪亚家族七代人在马孔多小镇的兴衰为主线，融合魔幻与现实，展现拉丁美洲百年历史。主题涵盖孤独、命运与文明冲突',
      link: 'https://weread.qq.com/web/reader/8bc329705e46708bcb0c164'  // 添加链接地址
    },
    { 
      image: '/classic_book/002.jpg', 
      title: '《平凡的世界》- 路遥', 
      introduction: '通过孙少安、孙少平兄弟的奋斗史，描绘1970-1980年代中国农村青年的苦难与成长，反映社会转型期的平民史诗。',
      link: 'https://weread.qq.com/web/reader/18832880717cf0511881c78'
    },
    { 
      image: '/classic_book/003.jpg', 
      title: '《红楼梦》- 曹雪芹', 
      introduction: '清代贵族贾府的兴衰史，以贾宝玉、林黛玉的爱情悲剧为核心，揭露封建家族腐败，被誉为“中国古典小说巅峰”。',
      link: 'https://weread.qq.com/web/reader/0da329707210329f0da4d39'
    },
    { 
      image: '/classic_book/004.jpg', 
      title: '《月亮与六便士》- 毛姆', 
      introduction: '以画家高更为原型，讲述证券经纪人斯特里克兰德放弃优渥生活，远赴塔希提岛追求艺术理想的故事，探讨天才与世俗的冲突。',
      link: 'https://weread.qq.com/web/reader/a8b322f0813ab954cg011488'
    },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《巴黎圣母院》- 雨果', 
    //   introduction: '以15世纪巴黎为背景，通过副主教克洛德、吉普赛女郎爱斯梅拉达和钟楼怪人卡西莫多的命运纠葛，批判教会黑暗与人性的扭曲。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《战争与和平》- 列夫·托尔斯泰', 
    //   introduction: '以拿破仑战争为背景，通过罗斯托夫、博尔孔斯基等贵族家族的命运，探讨历史规律与个人自由，展现俄国社会的宏大画卷。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《追风筝的人》- 卡勒德·胡赛尼', 
    //   introduction: '阿富汗富家少年阿米尔与仆人哈桑的友谊与背叛，在战乱中赎罪的故事，聚焦人性救赎与家国创伤。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《解忧杂货店》- 东野圭吾', 
    //   introduction: '一家连接过去与未来的杂货店，通过书信为他人解忧。小偷三人组在回信过程中实现自我救赎，展现温情与命运交织。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《哈姆雷特》- 莎士比亚', 
    //   introduction: '丹麦王子哈姆雷特为父复仇的悲剧，在犹豫与怀疑中揭示人性复杂，经典独白“生存还是毁灭”影响深远。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《红与黑》- 司汤达', 
    //   introduction: '木匠之子于连凭借才华跻身上流社会，却因爱情与野心走向毁灭，批判复辟时期法国的阶级固化。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《白鹿原》- 陈忠实', 
    //   introduction: '以陕西白鹿原上白、鹿两大家族三代人的争斗为线，展现清末至建国初期宗法制度的崩溃与人性的挣扎。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《飘》- 玛格丽特·米切尔', 
    //   introduction: '南北战争期间，南方贵族少女斯嘉丽在乱世中求生，对爱情与土地的执着折射出旧时代的消亡。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《复活》- 列夫·托尔斯泰', 
    //   introduction: '贵族涅赫柳多夫为赎罪帮助被诬陷的旧情人玛斯洛娃，揭露沙俄司法腐败，探讨道德“复活”与宗教救赎。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《老人与海》- 海明威', 
    //   introduction: '老渔夫圣地亚哥与巨型马林鱼的搏斗，诠释“人可以被毁灭，但不会被打败”的精神寓言。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《基督山伯爵》- 大仲马', 
    //   introduction: '水手爱德蒙遭陷害入狱，越狱后化身基督山伯爵复仇，情节曲折惊险，探讨正义与宽恕4。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《罪与罚》- 陀思妥耶夫斯基', 
    //   introduction: '贫困大学生拉斯柯尼科夫谋杀放贷老妇后陷入精神煎熬，最终通过忏悔获得救赎，剖析心理与道德困境。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《局外人》- 阿尔贝·加缪', 
    //   introduction: '主人公默尔索因杀人受审，却因在母亲葬礼上“无动于衷”被判死刑，揭示存在主义式的荒诞与真实。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《人生海海》- 麦家', 
    //   introduction: '以“上校”蒋正南的传奇人生为主线，通过村民视角揭开其战争伤痕与肚皮刺青的秘密，探讨苦难中的尊严。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《红高粱》- 莫言', 
    //   introduction: '“我爷爷”余占鳌与“我奶奶”戴凤莲在高密东北乡的爱恨情仇，以野性生命力对抗日军暴行，重构民间抗战史。',
    //   link: '/details/2'
    // },
    // { 
    //   image: '/classic_book/002.jpg', 
    //   title: '《四世同堂》- 老舍', 
    //   introduction: '北平小羊圈胡同祁家四代在日军占领下的屈辱与抗争，揭露战争对人性的摧残，被誉为“民族的痛史”。',
    //   link: '/details/2'
    // },
    // 更多图片...
  ]" />
</ClientOnly>
