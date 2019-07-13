const os = require('os')
const webpack = require('webpack')
const HappyPack = require('happypack')
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
  node: {
    fs: 'empty'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /dvaConfig/,
        use: [
          {
            loader: require.resolve('./DvaLoader.js')
          }
        ]
      },
      {
        test: /globalConfig/,
        use: require.resolve('./globalEnvLoader.js')
      },
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
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true
            }
          }
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
              [
                require.resolve('babel-plugin-import'),
                { libraryName: 'antd', style: true }
              ]
            ]
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })
  ]
}
