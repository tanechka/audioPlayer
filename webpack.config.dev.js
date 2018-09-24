const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/app/index.js",
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
        exclude: '/node_modules/',
        use: [
          {
            loader: 'style-loader', options: { sourceMap: true }
          },
          {
            loader: 'css-loader', options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader', options: { sourceMap: true }
          },
          {
            loader: 'stylus-loader', options: { sourceMap: true }
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
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({template:'./src/app/index.html'})
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: __dirname + '/dist'
  },
}
