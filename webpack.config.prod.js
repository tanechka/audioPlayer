const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: "./src/app/index.js",
  output: {
    filename: '[name].[hash].js',
    path:  __dirname + '/build',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          "babel-loader",
          "eslint-loader"
        ],
        include: [
          __dirname + '/src'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
       },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({ template:'./src/app/index.html' }),
    new UglifyJsPlugin({ cache: true })
  ]
}
