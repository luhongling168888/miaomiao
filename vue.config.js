module.exports = {
	publicPath: '/maomao',
    devServer : {
        proxy : {
            '/ajax' : {
                target : 'https://i.maoyan.com/apollo',
                changeOrigin : true
            }
        }
    }
}