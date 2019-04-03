const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config

    config.resolve.alias = {
      src: path.resolve(__dirname, 'src/'),
      db: path.resolve(__dirname, 'src/db/'),
    };

    return config;
  },
};
