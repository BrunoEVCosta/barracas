const path = require('path');
const webpack=require("webpack")

// Globally available examples: https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack



module.exports = {
    mode: 'production',
    entry: {
        shared:{
            import: ["./src/index.js","jquery"],
            filename: "webpack.js",
        },
        "cookieconsent":{
            import:["cookieconsent","cookieconsent/build/cookieconsent.min.css"],
            filename: "cookieconsent.js"
        },
        "popper":{
            import: "popper.js",
            dependOn: "shared",
            filename: "popper.js"
        },
        "bootstrap":{
            import: ["bootstrap","bootstrap/dist/css/bootstrap.min.css"],
            dependOn: "shared",
            filename:"bootstrap.js"
        },
        "vue":{
            import: ['vue-select/dist/vue-select.css'],
            filename:'vue.js'
        },
        "canvas-datagrid":{
            import: "canvas-datagrid",
            filename: "canvas-datagrid.js",
        },
        /*"easepick-css":{
            import: "@easepick/bundle/dist/index.css",
            filename: "easepick-css.js"
        },*/
        /*"easepick":{
            import: "@easepick/datetime/dist/index",
            filename: "easepick.js"
        }*/
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery",
            datetime: "@easepick/datetime/dist/index"
        }
    },
    //Provide jquery to modules
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery:'jquery',
            DateTime:'datetime'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public/webpack'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use:['style-loader','css-loader']
            },{
                test:/\.js$/,
                enforce: "pre",
                use:['source-map-loader']
            }]
    }
};
