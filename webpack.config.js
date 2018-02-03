/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

const DEV_MODE = process.env.NODE_ENV !== 'production'

if (DEV_MODE) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      }
    })
  )
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]  
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './demo/app'
  ],
  cache: DEV_MODE,
  debug: DEV_MODE,
  watch: DEV_MODE,
  devtool: DEV_MODE ? '#inline-source-map' : false,
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
}
