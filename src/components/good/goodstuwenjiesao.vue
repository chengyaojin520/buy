<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import Api from '@/api'
import qs from 'qs'
export default{
	data (){
		return{
			id:this.$route.params.id,
			info:{}//图文数据
		}
	},
  methods:{
		 getinfo(){
			  //获取商品图片   获取商品详情的信息
       	let requestParam = {
					id: this.id
				};
				Api.requestNetwork(Api.apiList.goodslist, qs.stringify(requestParam)).then(
					response => {
								if(response.status == 200){
											 this.info = response.data[0]
									}
								}
					)
		 }
	},

	created(){
		 this.getinfo()
	}

}
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>