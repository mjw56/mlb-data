import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';

class StatsActions {

  constructor() {}

  getStats() {

    let ref = new Firebase(process.env.FIREBASE_URL + "/mlb-data-app/players-stats");

    ref.on("value", (snapshot) => {

      Dispatcher.handleAction({
        type: Constants.ActionTypes.RECEIVE_PLAYER_STATS,
        stats: snapshot.val()
      });

    }, (err) => {
      console.log('failed to get firebase data ' + err.code);
    });
  }

}

let sa = new StatsActions();
export default sa;
