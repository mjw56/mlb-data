import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';
import Firebase from 'firebase';
import LeagueActions from '../actions/league-actions';

class LeagueStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this._members = [];
    this._name = '';
    this._teams = [];
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getName() {
    return this._name;
  }

  getMembers() {
    return this._members;
  }

  getTeams() {
    return this._teams;
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _createLeague(league) {
    this.name = league.name;
  }

  _addNewMember(user) {
    this._members.push(user);
  }

  _fetchLeagueInfo(user) {
    LeagueActions.findLeaguesForUser(user);
  }

  _updateLeagueInfo(info) {

  }

  _dispatchToken(action) {

    switch(action.type) {

      case Constants.ActionTypes.USER_LOGIN:
          this._fetchLeagueInfo(action.user);
          break;

      case Constants.RECEIVE_USER_LEAGUE_INFO:
          this._updateLeagueInfo(action.info);
          this._emitChange();
          break;

      case Constants.ActionTypes.CREATE_LEAGUE:
          this._createLeague(action.league);
          this._emitChange();
          break;

      case Constants.ActionTypes.ADD_NEW_MEMBER:
          this._addNewMember(action.user);
          this._emitChange();
          break;

        default:
          // no op
    }
  }
}

let ls = new LeagueStore();
export default ls;
