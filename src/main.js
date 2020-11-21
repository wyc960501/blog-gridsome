// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import util from './utils/util'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(ElementUI)
  Vue.component('Layout', DefaultLayout)

  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location
    }
    if (util.copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }

  Vue.prototype.$util = util
}
