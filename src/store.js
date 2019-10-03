import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

export default new Vuex.Store({
  state: {
    car: car // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }   
  },
  
  mutations: {
    
    //点击加入购物车 ，把商品信息，保存到store
    addToCar(state,goodsinfo){
        // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可
      // 假设 在购物车中，没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      
       // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
       if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
     
    },
    
    //购物车里的每个商品  发生改变时  调用getters里算出购物车的总数
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析： 
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    
    //根据id删除
    removeFormCar(state,id){
       state.car.some((item,i)=>{
        if( item.id == id){
           state.car.splice(i,1)
           return true
        }
       })
      // 当删除完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    
    //控制开关  将数据同步到store
    updateGoodsSelectd(state,info){
      state.car.some(item=>{
        if(item.id ==  info.id){
          item.selected = info.selected
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters:{
     //先当于计算属性  算出购物车的总数
     getAllCount(state){
       let c = 0;
       state.car.forEach(item =>{
           c+=item.count
       })
       return c
     },

     //
     getgoodscount(state){
       var o = {}
       state.car.forEach(item=>{
         o[item.id] = item.count
       })
       return o
     },

     //开关状态
     getGoodsSelect(state){
       let o = {}
       console.log( state.car)
       state.car.forEach(item=>{
         o[item.id] = item.selected
       })
       return o
     },

     //获取勾选数量  和 总价
     getgouxuan_allnum(state){
         var o = {
           count:0,//勾选数量
           amount:0 //勾选总价
         }
         state.car.forEach(item=>{
           if(item.selected){
             o.count += item.count
             o.amount += item.price * item.count
           }
         })
         return o
     }
  },
  actions: {

  }
})
