module.exports = {
  devServer: {
    proxy: {
      '^/v1/admin': {
        target: 'http://10.100.20.25:8080/buy-heima/api/lunbo/', // 代理接口    //请求的目标地址的BaseURL   //服务器api地址
        ws: true,
        changeOrigin: true   ,//是否开启跨域
         pathRewrite: {   
                 '^/api': '' //规定请求地址以什么作为开头   //重写路径
            }
      },
    }
  }
}