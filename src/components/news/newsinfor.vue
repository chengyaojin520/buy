<template>
	<div class="newsinfor-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfor.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfor.add_time | dataFormat }}</span>
      <span>点击：{{ newsinfor.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsinfor.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
	<share :config="shareConfig"></share>
  </div>
</template>

<script>
import Api from '@/api';
import qs from "qs";
import comment from "../subcomponents/comment.vue";
export default {
	components: {
			// 用来注册子组件的节点
			"comment-box": comment
        },
	data (){
		return{
			id: this.$route.params.id , //将url地址中传递过来的id 存放到data中  
			newsinfor:{},
			//分享配置
			shareConfig: {
				url                 : '', // 网址，默认使用 window.location.href
				source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
				title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
				description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
				image               : '', // 图片, 默认取网页中第一个img标签
				sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
				//sites: ['iShare_weibo', 'iShare_qq', 'iShare_wechat', 'iShare_tencent', 'iShare_douban', 'iShare_qzone'],
				disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
				wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
				wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
			}

		}
	},
		methods: {
			getnewsinfor() {
				// 获取轮播图数据的方法
				let requestParam = {
					id: this.id
				};
				Api.requestNetwork(Api.apiList.newsinfor, qs.stringify(requestParam)).then(
					response => {
						this.newsinfor = response.data[0]
                        //console.log(this.newsinfor)
					}
				);
			}
		},
		
		created() {
			this.getnewsinfor()
		}
}
</script>

<<style lang="scss" scoped>
.newsinfor-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>