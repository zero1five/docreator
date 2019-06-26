const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./paths')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs
  ],
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: require.resolve('happypack/loader'),
        include: paths.appSrc,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          require.resolve('less-loader')
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [require.resolve('babel-preset-react-app')],
            plugins: [
              require.resolve('react-hot-loader/babel'),
              [
                require.resolve('@babel/plugin-proposal-decorators'),
                { legacy: true }
              ],
              [
                require.resolve('@babel/plugin-proposal-class-properties'),
                { loose: true }
              ],
              ['import', { libraryName: 'antd', style: true }]
            ]
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })
  ]
}
