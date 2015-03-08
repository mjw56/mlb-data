import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class LeagueActions {

  findLeaguesForUser(user) {
    firebaseAPI.findLeaguesForUserID(user.id).then((result) => {
      this.dispatch(result);
    });
  }

  createLeague(info) {
    firebaseAPI.createLeague(info);
    this.dispatch({ inLeague: true, info: info });
  }

  getAllLeagues() {
    firebaseAPI.getAllLeagues().then((leagues) => {
      this.dispatch(leagues);
    });
  }

  joinLeague(name, userId) {
    firebaseAPI.joinLeague(name, userId).then((result) => {
      this.dispatch({ name: name, userId: userId});
    });
  }

}

export default alt.createActions(LeagueActions);
