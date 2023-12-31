const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
      new InjectManifest({
        swSrc: '/src-sw.js',
        swDest: 'src-sw.js',
      }), 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
      new WebpackPwaManifest({
            name: 'My Progressive Web App',
            short_name: 'MyPWA',
            description: 'My awesome Progressive Web App!',
            icons: [
              {
                src: './src/images/logo.png',
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons'),
              },
            ],
            orientation: "portrait",
            display: "standalone",
            start_url: "./"
          }),

    ],

    module: {
      rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
      ],
    },
  };
};
