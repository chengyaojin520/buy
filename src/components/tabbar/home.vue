<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunbo_list="lunbo_list"></swiper> 

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="@/assets/images/liugonge/menu1(1).png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="@/assets/images/liugonge/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="@/assets/images/liugonge/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/liugonge/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/liugonge/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/images/liugonge/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Api from "@/api";
import swiper from '@/components/subcomponents/swiper'
export default {
  data() {
    return {
      //轮播图数据
      lunbo_list: []
    };
  },
  components:{
    swiper
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      Api.requestNetwork(Api.apiList.getlunbo).then(response => {
        response.data.forEach(item =>{
          item.img_url = Api.IMG_URL_SHUJUKU + item.img_url
        })
        this.lunbo_list = response.data;
      });
    }
  },
  created() {
    this.getLunbotu();
  }
};
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
  img {
    // display: block;
    width: 60px;
  }
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>