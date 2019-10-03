import Vue from 'vue'
import router from '@/router'
import { Notification } from 'element-ui';
import axios from 'axios'
  
const BASE_URL = process.env.VUE_APP_BASE_URL; //       http:/192.168.7.231/buy-heima/api/lunbo/  http://192.168.31.210
const BASE_URL_ADMIN_PATH = '/buy-heima/api/'; //
const BASE_TIMEOUT = process.env.VUE_APP_BASE_TIMEOUT; //请求超时  默认5000
const AUTH_TOKEN_FLAG = process.env.VUE_APP_AUTH_TOKEN_FLAG; //token
const TOKEN_EMPTY_CODE = process.env.VUE_APP_TOKEN_EMPTY_CODE; //令牌失效返回的状态码
const TOKEN_INVALID_CODE = process.env.VUE_APP_TOKEN_INVALID_CODE; //令牌失效返回的返回状态码
const Time_out_tishi = 1500;
const IMG_URL_SHUJUKU = process.env.VUE_APP_IMG_URL_SHUJUKU;  //数据库图片   ip域名
//console.log(BASE_URL)
/** 所有接口变量定义 */
const apiList = {
	newslist : 'newslist/',   //新闻数据接口
  getlunbo : 'lunbo/', //轮播图数据  
	newsinfor: 'newsinfor/', //新闻详情  /
	comment: 'comment/' ,//评论数据
	insert_comment:'insert_comment/', //增加评论
	photo_fenlei:'photo_fenlei/', //图片分类数据
	photo_info:'photo_info/', //图片分类数据
	photo_neiron:'photo_neiron/', //图片内容
	photo_suoluetu:'photo_suoluetu/', //缩略图
	goodslist:'goodslist/',//商品详情数据
}
//console.log(BASE_URL+BASE_URL_ADMIN_PATH+apiList.getlunbo)
/** 请求网络变量定义 */
const instance = axios.create({
	baseURL: BASE_URL + BASE_URL_ADMIN_PATH,
	timeout: BASE_TIMEOUT,
});

// TOKEN_EMPTY_CODE,
// TOKEN_INVALID_CODE
//请求返回拦截，把数据返回到页面之前做些什么...
instance.interceptors.response.use((response) => {
	//特殊错误处理，状态为10时为登录超时
	if(response.data.code == TOKEN_EMPTY_CODE ||
		response.data.code == TOKEN_INVALID_CODE) {
		Notification.success({ //弹窗提示
			title: 'error',
			message: '令牌失效，请重新登录！！',
		});
		localStorage.setItem(AUTH_TOKEN_FLAG, ''); //token失败 设置  本地储存为空
		router.push('login'); //跳到登录页
	}
	return response;
}, function(error) {
	return Promise.reject(error);
});

/**
   * 网络请求
   * @param {String} url 请求地址
   * @param {Array} data 请求数据
   */
function requestNetwork(url, data = null) {
	let token = localStorage.getItem(AUTH_TOKEN_FLAG);
	instance.defaults.headers.common['Authorization'] = '';
	if(token !== null && token !== '') {
		//console.log("有token----可以登录")
		instance.defaults.headers.common['Authorization'] = localStorage.getItem(AUTH_TOKEN_FLAG); //如果token不为空或不为null  赋值token
	}
	return new Promise((resolve, reject) => {
		instance.request({ //请求 后台路由
			baseURL: BASE_URL + BASE_URL_ADMIN_PATH, //url  为 封装好的
			method: (data === null) ? 'get' : 'post', //如果data=null   就是get请求   如果  有带参数就是post请求
			url: url,
			data: data
			
		}).then((response) => {
			
			resolve(response);
		}).catch((error) => {
			reject(error)
		});
	});
}
//console.log(BASE_URL_ADMIN_PATH)
//console.log(BASE_URL)
//console.log(BASE_URL + BASE_URL_ADMIN_PATH)

// console.log(apiList.delclass)
// console.log(apiList.classeditor)
export default {
	apiList,
	requestNetwork,
	AUTH_TOKEN_FLAG,
	TOKEN_EMPTY_CODE,
	TOKEN_INVALID_CODE,
	Time_out_tishi,
	IMG_URL_SHUJUKU,
	//MANHUA_URL,    //漫画写真列表 头部添加内容后 封面显示的链接地址
//	YPIAN_TIAOZHAUN_URL, //点击影片列表里的 标题 跳转 前台播放页
//	XIAOSHUO_TIAOZHAUN_URL,  //小说列表 点击 标题跳转前台 页面
//	XIAOSHUO_FENLEI_TIAOZHAUN_URL//点击跳转 对应分类
}


