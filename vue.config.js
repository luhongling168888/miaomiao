module.exports = {
	// publicPath: '/maomao',
    devServer : {
        proxy : {
			'/api' : {
			    target : 'http://localhost:3000',
			    changeOrigin : true
			},
            '/apollo' : {
                target : 'https://i.maoyan.com',
                changeOrigin : true
            }
        }
    }
}