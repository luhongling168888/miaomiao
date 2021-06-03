module.exports = {
	publicPath: '/maomao',
    devServer : {
        proxy : {
            '/apollo' : {
                target : 'https://i.maoyan.com',
                changeOrigin : true
            }
        }
    }
}