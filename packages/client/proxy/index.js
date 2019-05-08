const express = require('express');
const proxy = require('http-proxy-middleware');

const DEV = process.env.NODE_ENV !== 'production';
const target = DEV ? 'http://localhost:4100' : process.env.API_URL;

const app = express();
app.use(
  proxy('/api', {
    target,
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  })
);

module.exports = app;
