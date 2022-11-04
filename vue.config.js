const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
    // на тот случай, если решил жестить с Fetch-api
    // devServer: {
    //     proxy: {
    //         '^/': {
    //             target: process.env.VUE_APP_API,
    //             ws: false
    //         }
    //     }
    // }
})
