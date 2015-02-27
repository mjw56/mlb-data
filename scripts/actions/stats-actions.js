import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';
import firebaseAPI from '../utils/firebase-mlb-api';

class StatsActions {

  constructor() {}

  getStats() {
    firebaseAPI.getPlayerStats().then((stats) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.RECEIVE_PLAYER_STATS,
        stats: stats
      });
    });
  }

}

let sa = new StatsActions();
export default sa;
