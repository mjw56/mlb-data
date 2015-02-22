import mongoose from 'mongoose';
import express from 'express';
import mlbDataApi from './utils/mlb-data-api';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config';

let serverInit = () => {
  const api = express();

  const app = express()
    .all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With')
      next()
  });

  app.use('/api', api)
    .listen(3001)
}

let getData = () => {
  mlbDataApi.getPlayerData();
  //mlbDataApi.getPlayerStats('2014');
  // mlbDataApi.getPlayerStats('2013');
  // mlbDataApi.getPlayerStats('2012');
  // mlbDataApi.getPlayerStats('2011');
}

let mongoInit = () => {

  let uri = process.env.MLB_MONGO_URI;

  mongoose.connect(uri, function(err, res) {

    if(err) {
      console.log('error connecting to ' + uri + '. ' + err);
    } else {
      console.log('success connecting to ' + uri + '.');
    }

    getData();

  });
}

mongoInit();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
