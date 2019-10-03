<template>
  <div>
    <!-- <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in photo_fenlei" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>

    </div>-->
    <!-- 顶部横向滑动列表 -->
    <div id="slider" class="mui-slider">
      <div class="wrapper" ref="personWrap">
        <ul class="content" ref="personTab">
          <li v-for="item in photo_fenlei" :key="item.id" @click="getPhotoListByCateId(item.id)"
            :class="{active : active == item.id}">{{item.title}}</li>
        </ul>
        <div class="loading-wrapper"></div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in photo_info" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Api from "@/api";
import qs from "qs";
import api from "@/mock/index.js";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      photo_fenlei: [],
      photo_info: [],
      length: 10
    };
  },

  methods: {
    //获取图片分类 moke数据
    //  getphoto_fenlei() {
    //      let page = 1;
    //      let pageSize = 7
    //      console.log(api.fetch_photo_fenlei(page, pageSize).data.list)
    //      this.photo_fenlei = api.fetch_photo_fenlei(page, pageSize).data.list
    //      this.photo_fenlei.unshift({ title: "全部", id: 0 });
    // },
    getphoto_fenlei() {
      Api.requestNetwork(Api.apiList.photo_fenlei).then(response => {
        this.photo_fenlei = response.data;
        this.photo_fenlei.unshift({ title: "全部", id: 0 });
        this.length = response.data.length;
      });
    },

    //获取图片详情列表
    getPhotoListByCateId(cateId) {
      this.active = cateId; //设置高亮
      let requestParam = {
        id: cateId
      };
      Api.requestNetwork(
        Api.apiList.photo_info,
        qs.stringify(requestParam)
      ).then(response => {
        //因为数据库图片地址事绝对路径   没有数据库域名   所以要先拼接数据库域名
        response.data.forEach(item => {
           item.img_url = Api.IMG_URL_SHUJUKU + item.img_url
        });
        this.photo_info = response.data;
      });
    },

    //头部横向滚动函数
    personScroll() {
      // console.log( this.photo_fenlei.length)
      let width = this.length * 90; // 默认有六个li子元素，每个子元素的宽度为120px
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true // 因为scrollY默认为true，其实可以省略
      });
    }, 20);
  },
  created() {
    this.getphoto_fenlei();
    this.$nextTick(() => {
      this.personScroll();
    });
    this.getPhotoListByCateId(0);
  }
};
</script>

<style lang="scss" scoped>
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}
.content {
  // width:auto;
  // overflow:auto;
  display: flex;
  li {
    text-align: center;
    list-style: none;
    width: 120px;
  }
}

* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>