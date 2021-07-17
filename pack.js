/* eslint-disable no-console */
const { default: pack } = require('packx');
const argv = require('yargs').argv;
const pkg = require('./package.json');
const chalk = require('chalk');
const path = require('path');
const process = require('process');
const express = require('express');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const isDev = !!argv.dev;
let env = argv.env;

if (isDev) {
  env = 'test';
}
const publicPath = isDev ? '/' : ``;

function getPath(_path) {
  return path.resolve(__dirname, _path);
}

function exit(error) {
  console.log(error);
  process.exit(9);
}

function getDist(env) {
  if (env === 'prd') {
    return getPath(`./dist/${pkg.name}/`);
  } else if (env === 'test') {
    return getPath(`./t-dist/${pkg.name}/`);
  }
}

if (!isDev && !['prd', 'test'].includes(env)) {
  exit('params: env must be prd/test');
}

pack(
  isDev,
  {
    entry: {
      index: [`./src/index`],
    },
    devServer: {
      port: 3003,
      historyApiFallback: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      before: function (app) {
        app.use(express.static(path.join(__dirname, `public`)));
      },
    },
    output: {
      path: getDist(env),
      publicPath,
    },
    plugins: [new AntdDayjsWebpackPlugin()],
  },
  () => {
    // only non-dev mode this callback would be run
    console.log(chalk.yellowBright('准备发布:'));
  }
);
