module.exports = {
    // 开启代理服务器方式1
    /* devServer: {
        proxy: 'http://localhost:5000/'
    } */
    // 方式2
    devServer: {
        proxy: {
            // 请求前缀，前缀正确才会走代理，灵活控制
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: { '^/api': '' }, // 重写路径，防止请求的url带有请求前缀，非常重要，第一个参数是正则
                ws: true, // 用于支持websocket
                changeOrigin: true // 服务器说不说谎，true就是代理服务器跟目标为同一端口，一般写ture
            },
        }
    }
}