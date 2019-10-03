<template>
  <div>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in news_list" :key="item.id">
        <router-link :to="'/home/newsinfor/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | dataFormat }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
	import Api from '@/api';
	export default {
		data() {
			return {
				//轮播图数据
				news_list: [],
			}
		},
		methods: {
			getnewslist() {
				// 获取轮播图数据的方法
				Api.requestNetwork(Api.apiList.newslist).then(
					response => {
            response.data.forEach(item =>{
          item.img_url = Api.IMG_URL_SHUJUKU + item.img_url
        })
						this.news_list = response.data
						console.log(this.news_list)
					}
				);
			}
		},
		created() {
			this.getnewslist()
		}
	}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
	img{
		width:42px;
	}
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>