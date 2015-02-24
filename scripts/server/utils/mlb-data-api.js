import request from 'request';
import Player from '../models/Player';
import PlayerStats from '../models/PlayerStats';
import fs from 'fs';
import { Promise } from 'es6-promise';

let _getPlayerData = () => {

  let url = process.env.MLB_PLAYER_URL + process.env.MLB_FANTASY_KEY;

  return new Promise((resolve, reject) => {

    request(url, function (error, response, html) {
      if (!error && response && response.body) {
        let data = JSON.parse(response.body);

        fs.writeFile('mlb-player-data.json', JSON.stringify(data, null, 2), function (err) {
          if (err) return console.log(err);
          console.log('MLB Player Data > mlb-player-data.json');
        });

        resolve(data);

      }
    });

  });

}

let _getPlayerStatsData = (year) => {

  let url = process.env.MLB_PLAYER_STATS_2014_URL + process.env.MLB_FANTASY_KEY;

  return new Promise((resolve, reject) => {

    request(url, function (error, response, html) {
      if (!error && response && response.body) {

        let data = JSON.parse(response.body);

        fs.writeFile('mlb-player-'+year+'-stats-data.json', JSON.stringify(data, null, 2), function (err) {
          if (err) return console.log(err);
          console.log('MLB Player '+year+' Stats Data > mlb-player-'+year+'-stats-data.json');
        });

        resolve(data);

      }
    });

  });

}

export default {
  getPlayerData: _getPlayerData,
  getPlayerStatsData: _getPlayerStatsData
}
