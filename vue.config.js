module.exports = {
    devServer : {
        proxy : {
            '/ajax' : {
                target : 'https://i.maoyan.com/apollo',
                changeOrigin : true
            }
        }
    }
}