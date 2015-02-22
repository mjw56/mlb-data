import request from 'request';
import Player from '../models/Player';
import PlayerStats from '../models/PlayerStats';

let _getPlayerData = () => {

  let url = process.env.MLB_PLAYER_URL + process.env.MLB_FANTASY_KEY;

  request(url, function (error, response, html) {
    if (!error && response && response.body) {
      let data = JSON.parse(response.body);

      data.map((player, i) => {
        let p = new Player(player);

        p.save(function(err, result) {

          if(err)
            throw err;

          console.log('added ' + player.FirstName + ' ' + player.LastName + ' to the database.');

        });
      });

    }
  });
}

let _getPlayerStats = (year) => {

  let url = '';

  switch(year) {

    case '2014':
      url = process.env.MLB_PLAYER_STATS_2014_URL;
      break;

    case '2013':
      url = process.env.MLB_PLAYER_STATS_2013_URL;
      break;

    case '2012':
      url = process.env.MLB_PLAYER_STATS_2012_URL;
      break;

    case '2011':
      url = process.env.MLB_PLAYER_STATS_2011_URL;
      break;

  }

  url = url + process.env.MLB_FANTASY_KEY;

  request(url, function (error, response, html) {
    if (!error && response && response.body) {

      let data = JSON.parse(response.body);

      data.map((playerStats, i) => {
        let ps = new PlayerStats(playerStats);

        // TODO: group stats by year

        ps.save(function(err, result) {

          if(err)
            throw err;

          console.log('added player stats for ' + playerStats.Name);

        });
      });

    }
  });

}

export default {
  getPlayerData: _getPlayerData,
  getPlayerStats: _getPlayerStats
}
