# sub-vue1


### Ant Design Vue
```
npm i ant-design-vue --save
```
####  配置按需引入+主题色定制
```
  npm i babel-plugin-import -D
  npm i less -D
  npm i less-loader@6.0.0

  vue.config.js

  modules.exports = {
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            // If you are using less-loader@5 please spread the lessOptions to options directly
            modifyVars: {
              'primary-color': '#007BFC',
              'link-color': '#007BFC',
              'table-padding-vertical': '10px', // 表格上下padding
              'table-padding-horizontal': '10px', // 表格左右padding
              'font-size-base': '12px', // 基准字体大小
              'card-padding-base': '10px', // Card body padding
              'card-head-padding': '5px', // Card head padding
              'modal-body-padding': '20px 24px',
              'text-color': 'rgba(0,0,0,.85)', // 标准字
              'border-radius-base': '2px', // 圆角
              /** 按钮 */
              'btn-height-base': '30px', // 按钮高度
              'btn-font-weight': '400',
              'btn-border-radius-base': '2px', // 按钮圆角
              'btn-border-radius-sm': '2px', // 按钮圆角
              'btn-shadow': 'none', // 阴影
              'btn-primary-shadow': 'none', // 阴影
              'btn-text-shadow': 'none', // 文字阴影
              // 'btn-disable-color': '#f5f5f5', // 禁用
              /** input */
              'input-height-base': '30px',
              'input-padding-horizontal': '10px',
              'input-padding-horizontal-base': '10px',
              'input-placeholder-color': 'rgba(0,0,0,.45)',
              'input-border-color': '#D9D9D9',
              'input-disabled-bg': '#f5f5f5'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  }
  
```
```
babel.config.js

module.exports = {
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}

```

#### CDN

```
public/index.html

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>

    <!-- require cdn assets css -->
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
      <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
    <% } %>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <!-- require cdn assets js -->
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
      <script type="text/javascript" src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>
```

```
vue.config.js

const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development' // 是否为生产环境

// const { OSS_REGION, OSS_ACCESSKEYID, OSS_ACCESSKEYSECRET, OSS_BUCKET } = process.env
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
  },
  css: [
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.5/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js'
  ]
}

module.exports = {
  configureWebpack: {
    externals: (isProduction) ? assetsCDN.externals : {},
  },
  chainWebpack: config => {
    // 添加cdn
    config.plugin('html').tap(args => {
      if (isProduction) args[0].cdn = assetsCDN
      return args
    })
  }
}
```

#### 定义全局Less变量

```
创建 /assets/styles/variables2.less
npm i style-resources-loader -D

vue.config.js

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variables.less')
      ]
    })
}

module.exports = {
  chainWebpack: config => {
    // 全局引入index.less 样式
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  }
}

```
