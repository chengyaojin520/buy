<template>
	<div id="app">
		<!-- 顶部 Header 区域 -->
		<mt-header fixed title="黑马程序员·Vue项目">
				<span  slot="left" @click="goback" v-show="flag">
			      <mt-button icon="back">返回</mt-button>
		    </span>
		</mt-header>
	

		<!--身体变动-->
    <transition>
			<router-view></router-view>
		</transition>
		
		<!-- 底部 Tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
	</div>

	</div>
</template>

<script>
export default {
	data(){
		return {
			flag:false
		};
	},

	methods:{
		goback(){
			//点击后退
			this.$router.go(-1);
		}
	},

	watch: {
			"$route.path": function(newVal) {
				if (newVal === "/home") {
					this.flag = false;
				} else {
					this.flag = true;
				}
			}
	},

	created(){
		this.flag = this.$route.path === "/home" ? false : true;
	}
}



</script>

<style lang="scss" scoped>
.mint-header.is-fixed {
    z-index:99999;
}
	#app {
		padding: 40px 0 55px 0;
    overflow-x: hidden; //动画横向滚动条取消
	}
  .v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>