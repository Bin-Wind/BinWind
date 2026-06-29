import Theme from 'vitepress/theme'
import ImageList from './components/ImageList.vue'
import './style/var.css'
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('ImageList', ImageList)
  }
}
