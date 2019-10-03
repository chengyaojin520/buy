<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
        <vue-preview :slides="list" class="imgPrev"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件  fetch_photo_suolvtu
import comment from "@/components/subcomponents/comment.vue";
import Api from "@/api";
import qs from "qs";
import api from "@/mock/index.js";
//import { resolve } from 'dns';
export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到的 图片Id
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的图文详情
      let requestParam = {
        id: this.id
      };
      Api.requestNetwork(Api.apiList.photo_neiron, qs.stringify(requestParam)).then(response => {
        if (response.status == 200) {
          this.photoinfo = response.data[0];
        }
      });
    },
    getThumbs() {
      let requestParam = {imgid: this.id };
       Api.requestNetwork(Api.apiList.photo_suoluetu,qs.stringify(requestParam)).then(response => {
        if (response.status == 200) {
          response.data.forEach(item => {
            item.src = Api.IMG_URL_SHUJUKU + item.img_url;
            item.msrc = Api.IMG_URL_SHUJUKU + item.img_url;
            item.w = 600;
            item.h = 400;
          });
          this.list = response.data;
        }
      });
    }
  },
  components: {
    // 注册 评论子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss" >
// 缩略图 style标签中不要使用scoped
.thumbs{
    .imgPrev{
        .my-gallery{
            figure{
                display: inline-block;
                margin: 8px;
            }
            img{
                width: 80px;
                height: 60px;
            }
        }
    }
}
    
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
