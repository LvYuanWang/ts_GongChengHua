const path = require('path');
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development', // production(生产环境) | development(开发环境)
  entry: path.resolve(__dirname, 'src/index.ts'), // 设置入口文件为 src/index.ts 的绝对路径
  output: {
    path: path.resolve(__dirname, './dist'), // 设置输出文件的目录为 /dist 的绝对路径
    filename: '[name].[contenthash:6].js', // 设置输出文件的名称为 [name(入口文件明index)].[contenthash:6(根据内容生成哈希值取6位)].js
    clean: true, // 在每次构建前清理 /dist 文件夹
    publicPath: '/', // 设置所有资源的基础路径为 / , 比如打包后的 js 文件引用路径为 <script src="/index.abcdef.js"></script>
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'], // 按顺序解析以下扩展名的文件
  },
  // ts-loader --- typescript api 解析ts文件 --> js --> webpack打包
  module: {
    rules: [
      // 对所有以 .ts 结尾的文件使用 ts-loader/babel-loader 来处理
      {
        test: /\.ts$/,  // 匹配所有以 .ts 结尾的文件
        use: [  // 使用 ts-loader 来处理 .ts 文件
          // {
          //   loader: 'ts-loader', // ts-loader 用于解析 .ts 文件
          //   options: {  // 配置 ts-loader
          //     transpileOnly: true, // 只转译，不检查类型
          //   }
          // },
          {
            // babel也能对ts进行转译, 而且只直接分析抽象语法树(AST), 不会检查类型
            loader: 'babel-loader', // babel-loader 用于解析 .ts 文件
            options: {  // 配置 babel-loader
              presets: [  // 预设: 一系列插件的集合
                '@babel/preset-typescript', // 解析 .ts 文件
              ]
            }
          }
        ],
        exclude: /node_modules/ // 排除 node_modules 文件夹
      },
      // 对所有以 .js 结尾的文件使用 babel-loader 来处理, 用于处理 es6 语法, 将es6转换为es5, 以便浏览器兼容
      {
        test: /\.js$/,  // 匹配所有以 .js 结尾的文件
        use: ['babel-loader'], // 使用 babel-loader 来处理 .js 文件
        exclude: /node_modules/ // 排除 node_modules 文件夹
      }
    ]
  }
}