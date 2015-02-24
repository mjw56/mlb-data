import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';

class UserStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this._user = { loggedIn: false };
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getUserInfo() {
    return this._user;
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _loginUser(user) {
    this._user = { loggedIn: true, user: user };
  }

  _logoutUser() {
    this._user = { loggedIn: false, user: {} };
  }

  _dispatchToken(action) {

    switch(action.type) {

    case Constants.ActionTypes.USER_LOGIN:
          this._loginUser(action.user);
          this._emitChange();
          break;

    case Constants.ActionTypes.USER_LOGOUT:
          this._logoutUser();
          this._emitChange();
          break;

        default:
          // no op
    }
  }
}

let us = new UserStore();
export default us;
