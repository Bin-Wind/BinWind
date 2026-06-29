import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "BinWind",
  description: "一条路的终点，是另一条路的起点",
  appearance: true,
  lastUpdated: false,
  head:[
    ['link',{rel:'icon',href:'/images/logo.png'}], 
  ],
  themeConfig: {
    outline: 'deep',
    outlineTitle: '目录',
    docFooter: {       
      prev: false,
      next: false
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/index' },
      { text: '编程', link: '/Code/index' },
      { text: '服务器', link: '/Server/index' },
      { text: '设计', link: '/Design/index' },
      { text: '应用', link: '/APP/index' },
      { text: '书籍', link: '/Book/index' },
      { text: '视频', link: '/Video/index' },
      { text: '其他', link: '/Other/index' },
    ],
    sidebar: {
      '/Code/': [
        {
          text: '前言',
          link: '/Code/index',
          collapsed: false,
        },
        {
          text: 'PHP',
          collapsed: false,
          items: [
            { text: '部署', link: '/Code/php/index' },
            { text: '判断图片是正方形还是长方形', link: '/Code/php/1' },
            { text: '精确查询', link: '/Code/php/2' },
            { text: '数组去重的几种方法', link: '/Code/php/3' },
            { text: '防止 SQL 注入的最佳实践', link: '/Code/php/4' },
            { text: '文件上传安全处理', link: '/Code/php/5' },
            { text: '日期时间处理技巧', link: '/Code/php/6' },
            { text: '错误处理与日志记录', link: '/Code/php/7' },
            { text: '缓存技术详解', link: '/Code/php/8' },
            { text: 'JSON 处理常见问题', link: '/Code/php/9' },
            { text: '性能优化技巧', link: '/Code/php/10' },
            { text: '正则表达式实用技巧', link: '/Code/php/11' },
            { text: 'Session 与会话管理', link: '/Code/php/12' },
            { text: '中的引用与深浅拷贝', link: '/Code/php/13' },
            { text: '生成器（Generator）使用详解', link: '/Code/php/14' },
            { text: '闭包（Closure）与匿名函数', link: '/Code/php/15' },
            { text: 'Trait 特性详解', link: '/Code/php/16' },
            { text: '命令行（CLI）开发指南', link: '/Code/php/17' },
            { text: '常用设计模式', link: '/Code/php/18' },
            { text: '多字节字符串处理（MBString）', link: '/Code/php/19' },
            { text: '邮件发送解决方案', link: '/Code/php/20' },
            { text: '图片处理（GD 库）', link: '/Code/php/21' },
            { text: '代码调试技巧', link: '/Code/php/22' },
          ]
        },
        {
          text: 'Node',
          collapsed: false,
          items: [
            { text: 'Node 部署', link: '/Code/node/index' },
            { text: 'Package.json Scripts 详解', link: '/Code/node/1' },
          ]
        },
      ],
      '/Server/': [
        {
          text: '服务器',
          collapsed: false,
          items: [
            { text: '前言', link: '/Server/index' },
            { text: '解决 Git Bash 连接 GitHub 超时问题 (443端口)', link: '/Server/1' },
          ]
        }
      ],
      '/Design/': [
        {
          text: '设计',
          collapsed: false,
          items: [
            { text: '前言', link: '/Design/index' },
          ]
        }
      ],
      '/APP/': [
        {
          text: '应用',
          collapsed: false,
          items: [
            { text: '前言', link: '/APP/index' },
          ]
        }
      ],
      '/Book/': [
        {
          text: '书籍',
          collapsed: false,
          items: [
            { text: '前言', link: '/Book/index' },
            { text: '经典书籍', link: '/Book/classic' },
          ]
        }
      ],
      '/Video/': [
        {
          text: '视频',
          collapsed: false,
          items: [
            { text: '前言', link: '/Video/index' },
          ]
        }
      ],
      '/Other/': [
        {
          text: '其他',
          collapsed: false,
          items: [
            { text: '前言', link: '/Other/index' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/binbin-design?tab=repositories' }
    ],
    search: {
        provider: 'local'
    },
    footer: {
        message: 'BinWind',
        copyright: 'Copyright © 2025 - 2026 present Evan You'
    },
  },
})