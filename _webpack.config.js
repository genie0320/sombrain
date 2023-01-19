const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/* mode : npx webpack
- development : -
- production : - webpack.config.prod.js
*/

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  resolve: {},
  module: {
    rules: [
      {
        test: /\.(js)x?$/, // js, jsx로 끝나는 모든 파일
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // css로 끝나는 모든 파일
        use: ['style-loader', 'css-loader'], // css-loader는 css파일을 모듈 처럼 사용할 수 있게 해주는 로더이고  style-loader는 css-loader가 처리해준 모듈처럼 사용할 수있게 한 js파일의 css문자열을 브라우저에 html에 주입시켜 브라우저에 보여질 수 있도록 처리해주는 로더이다
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // 로더는 한 파일에 여러개가 실행될 때 뒤에서 부터 앞으로 실행된다.
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // 이미지 파일을 모듈로 사용할 수 있도록 변환하는 역할을 하는 로더이다.
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: '' }],
    }),

    new CleanWebpackPlugin(),
  ],
};
