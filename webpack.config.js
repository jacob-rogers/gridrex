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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
       debug: true
    })
  )
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
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
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]  
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'demo', 'app.js')
  ],
  watch: DEV_MODE,
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
  output: {
    path: path.join(__dirname, 'demo'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    publicPath: '/',
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: plugins,
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
