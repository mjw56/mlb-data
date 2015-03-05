import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';
import firebaseAPI from '../utils/firebase-mlb-api';

class LeagueActions {

  constructor() {}

  findLeaguesForUser(user) {
    firebaseAPI.findLeaguesForUserID(user.id).then((result) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.RECEIVE_LEAGUES_USER_IS_IN,
        league: result
      });
    });
  }

  createLeague(info) {
    firebaseAPI.createLeague(info);

    Dispatcher.handleAction({
      type: Constants.ActionTypes.CREATE_LEAGUE,
      league: { inLeague: true, info: info }
    });
  }

  getAllLeagues() {
    firebaseAPI.getAllLeagues().then((leagues) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.RECEIVE_ALL_LEAGUES,
        leagues: leagues
      });
    });
  }

  joinLeague(name, userId) {
    firebaseAPI.joinLeague(name, userId).then((result) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.JOINED_LEAGUE,
        info: { name: name, userId: userId}
      });
    });
  }

}

let la = new LeagueActions();
export default la;
