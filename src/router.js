import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/tabbar/home'
import member from '@/components/tabbar/member'
import search from '@/components/tabbar/search'
import shopcar from '@/components/tabbar/shopcar'
import newslist from '@/components/news/newslist'
import newsinfor from '@/components/news/newsinfor'
import photolist from '@/components/photo/photolist'
import photoinfo from '@/components/photo/photo_infor'
import goodslist from '@/components/good/goodslist'
import goodsinfo from '@/components/good/goodsinfo'
import goodstuwenjiesao from '@/components/good/goodstuwenjiesao'
import goodscomment from '@/components/good/goodscomment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/', redirect:'/home'},
    {  path: '/home', name: 'home',  component: home },
    {  path:'/member', name:'member', component:member},
    {  path:'/search', name:'search', component:search},
    {  path:'/shopcar', name:'shopcar', component:shopcar},
    {  path:'/home/newslist', name:'newslist', component:newslist},
    {  path:'/home/newsinfor/:id', name:'newsinfor', component:newsinfor},
    {  path:'/home/photolist/', name:'photolist', component:photolist},
    {  path:'/home/photoinfo/:id', name:'photoinfo',component:photoinfo},
    {  path:'/home/goodslist/', name:'goodslist',component:goodslist},
    {  path:'/home/goodsinfo/:id', name:'goodsinfo', component:goodsinfo},
    {  path:'/home/goodstuwenjiesao/:id',name:'goodstuwenjiesao',component:goodstuwenjiesao},
    {  path:'/home/goodscomment/:id',name:'goodscomment',component:goodscomment},
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
