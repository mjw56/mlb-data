import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';

class StatsActions {

  constructor() {}

  userLogin(user) {
    Dispatcher.handleAction({
      type: Constants.ActionTypes.USER_LOGIN,
      user: user
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
