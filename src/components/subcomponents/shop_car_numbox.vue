<template>

  <el-input-number  :value="initcount"  @change="countChanged" :min="1"  label="描述文字" class="car_input" ></el-input-number>

</template>

<script>

export default {
  data(){
    return{
      num:''
    }
  },
 
  methods: {
    //这个是element自带方法  v-model="initcount"   :value="initcount"
    countChanged(value) {
      console.log(value)
      // 数量改变了
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
      // 每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value);
     this.$store.commit("updateGoodsInfo", {id:this.goodsid,count:value});
     //console.log(count)
    }
  },
  props: ["initcount","goodsid"],
  
  
};
</script>

<style lang="scss" scoped>
 

</style>
