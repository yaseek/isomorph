// https://habr.com/post/309958/
global.Promise         = require('bluebird')

const webpack            = require('webpack')
const path               = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const publicPath         = 'http://localhost:8050/public/assets'
const cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css'
const jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js'

const getModule = (id) => id

const isDevelopment = process.env.NODE_ENV !== 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
}

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['babel-polyfill', './src/client.js'],
  resolve: {
    modules:    [ 'node_modules' ],
    extensions: ['.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: getModule('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: '[local]'
              // localIdentName: isDevelopment ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:8]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require(getModule('postcss-import')),
                require(getModule('postcss-for')),
                require(getModule('postcss-simple-vars')),
                require(getModule('postcss-custom-properties')),
                require(getModule('postcss-nested')),
                require(getModule('postcss-color-function')),
                require(getModule('autoprefixer'))({
                  browsers: ['last 2 versions', 'ie >= 9']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /public/]
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : void 0,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}

module.exports = config
