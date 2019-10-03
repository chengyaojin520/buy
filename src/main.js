import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'
Vue.use(Share)

// 导入 MUI 的样式
import '@/assets/lib/mui/css/mui.min.css'

// 导入扩展图标样式
import '@/assets/lib/mui/css/icons-extra.css'

//引入滚动插件
import BScroll from 'better-scroll'

 //导入格式化时间插件上面126
 import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  //1先在cmd  npm i moment -S
  //2导入格式化时间插件上面126
  //3
  return moment(dataStr).format(pattern)
})

// 全部导入 Mint-UI 中的组件   
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 按需导入 Mint-UI 中的组件   
// import { Header, Swipe, SwipeItem, Button,Lazyload  } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload); 


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 安装 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview)

Vue.config.productionTip = false

new Vue({
  router,
  store, //只要挂在到vue上  所有组件都可以访问
  render: h => h(App)
}).$mount('#app')
