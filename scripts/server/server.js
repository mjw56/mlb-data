import mongoose from 'mongoose';
import express from 'express';
import mlbDataApi from './utils/mlb-data-api';
import Firebase from 'firebase';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config';

let serverInit = () => {
  const api = express()
    .get('/', (req, res) => {
      res.send(React.renderToString(App));
    });

  const app = express()
    .all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With')
      next()
  });

  app.use('/api', api)
    .listen(3001)
}

let loadPlayerData = () => {
  mlbDataApi.getPlayerData().then((data) => {

    let ref = new Firebase(process.env.FIREBASE_URL+'/mlb-data-app');

    let playersRef = ref.child("players");

    playersRef.set(data);

  });
}

let loadPlayerStatsData = () => {
  mlbDataApi.getPlayerStatsData().then((data) => {

    let ref = new Firebase(process.env.FIREBASE_URL+'/mlb-data-app');

    let playersStatsRef = ref.child("players-stats");

    playersStatsRef.set(data);

  });
}

/**
* Helper to populate mlb data into
* a firebase reference
*/
let _firebaseInit = () => {

  loadPlayersData();
  loadPlayerStatsData('2014');

}

//_firebaseInit();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
