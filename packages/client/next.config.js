const path = require('path');
const withCss = require('@zeit/next-css');

module.exports = {
  target: 'serverless',
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

      return config;
    },
  }),
  env: {
    CLIENT_URL: process.env.CLIENT_URL,
  },
};
