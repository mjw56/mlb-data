import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';
import firebaseAPI from '../utils/firebase-mlb-api';

class StatsActions {

  constructor() {}

  userLogin(user) {
    firebaseAPI.authenticateUser().then((user) => {
      //firebaseAPI.clearData(user.id);

      Dispatcher.handleAction({
        type: Constants.ActionTypes.USER_LOGIN,
        user: user
      });
    });
  }

  userLogout() {
    Dispatcher.handleAction({
      type: Constants.ActionTypes.USER_LOGOUT
    });
  }

}

let sa = new StatsActions();
export default sa;
