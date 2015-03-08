import alt from '../alt';
import UserActionCreators from '../actions/user-actions';

class UserStore {

  constructor() {
    this.bindActions(UserActionCreators);
    this._user = { loggedIn: false };
  }

  onUserLogin(user) {
    this._user = { loggedIn: true, user: user };
  }

  onUserLogout() {
    this._user = { loggedIn: false, user: {} };
  }

  static isAuth() {
    return this.getState()._user.loggedIn;
  }

  static getUserInfo() {
    return this.getState()._user;
  }

}

export default alt.createStore(UserStore, 'UserStore');
