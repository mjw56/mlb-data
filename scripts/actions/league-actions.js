import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';
import firebaseAPI from '../utils/firebase-mlb-api';

class LeagueActions {

  constructor() {}

  findLeaguesForUser(user) {
    firebaseAPI.findLeaguesForUserID(user.id).then((result) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.RECEIVE_USER_LEAGUE_INFO,
        league: result
      });
    });
  }

  createLeague(league) {
    // TODO: call api
  }

}

let la = new LeagueActions();
export default la;
