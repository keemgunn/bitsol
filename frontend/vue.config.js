module.exports = { 
  devServer: {
    proxy: { 
      '/api': { 
        target: 'http://localhost:5500/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../backend/public'
}