const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // configureWebpack: {
  //   externals: {
  //     // AMap: 'AMap',
      
  //     AMap: "window.AMap",
  //   },
  // }
  configureWebpack: {
    externals: {
      'AMap': 'AMap'
    },
    // changeOrigin: true,
    performance: {
      hints:false
    }
}
  


})

// module.exports = {
//   transpileDependencies: true,
//   lintOnSave: false,
  
// }



//// // npm install vue-router@next 升级