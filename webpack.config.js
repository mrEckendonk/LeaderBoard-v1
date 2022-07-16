const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    app: './modules/app.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3001,
    open: true,
    hot: true,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
      favicon: './src/favicon.png',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.(svg|jpg|png)$/i,
        type: 'asset/resource',
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'image/png',
            encoding: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
