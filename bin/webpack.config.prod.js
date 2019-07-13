const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const paths = require('./paths')

module.exports = {
  entry: {
    bundle: paths.appIndexJs,
    vendor: ['react']
  },
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:6].bundle.js',
    publicPath: './',
    path: path.resolve('dist')
  },
  node: {
    fs: 'empty'
  },
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
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              presets: [require.resolve('babel-preset-react-app')],
              plugins: [
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
        ]
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
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: chunk => chunk.name == 'main',
          reuseExistingChunk: true,
          priority: 1,
          test: module => /[\\/]node_modules[\\/]/.test(module.context),
          minChunks: 1,
          minSize: 0
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })
  ]
}
