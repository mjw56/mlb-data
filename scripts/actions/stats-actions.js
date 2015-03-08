import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class StatsActions {
  
  getStats() {
    firebaseAPI.getPlayerStats().then((stats) => {
      this.dispatch(stats);
    });
  }

}

export default alt.createActions(StatsActions);
