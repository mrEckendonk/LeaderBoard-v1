// const lib = require('zlib');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); // only add this if you don't have yet

// replace accordingly './.env' with the path of your .env file
require('dotenv').config({ path: './.env.local' });

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    app: './modules/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
      favicon: './src/favicon.png',
    }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        // test: /\.(woff|woff2|eot|ttf)$/,
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: 'asset/resource',
        generator: {
          // filename: 'fonts/[name]-[hash][ext][query]'
          filename: 'fonts/[name][ext][query]',
        },
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        use: {
          loader: 'file-loader',
          options: {
            // limit: 8192,
            name: '[name].[ext]',
            outputPath: 'assets/images/',
            mimetype: 'image/png',
            encoding: true,
          },
        },
      },
    ],
  },
};
