require('dotenv').config();

const path = require('path');
const withCss = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...withCss({
    webpack(config) {
      // CSS
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: '[name].[ext]',
          },
        },
      });

      // Modules alias
      config.resolve.alias['components'] = path.join(__dirname, 'components');

      // Plugins
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ];

      return config;
    },
  }),
  env: {
    API_URL: process.env.API_URL,
  },
};
