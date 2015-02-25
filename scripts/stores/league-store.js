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
    this.league = { inLeague: false };
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getLeague() {
    return this.league;
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _addNewMember(user) {
    this.league.members.push(user);
  }

  _fetchLeagueInfo(user) {
    LeagueActions.findLeaguesForUser(user);
  }

  _updateLeagueInfo(league) {
    this.league = { inLeague: league.inLeague, info: league.info }
  }

  _dispatchToken(action) {

    switch(action.type) {

      case Constants.ActionTypes.USER_LOGIN:
          this._fetchLeagueInfo(action.user);
          break;

      case Constants.ActionTypes.RECEIVE_USER_LEAGUE_INFO:
          this._updateLeagueInfo(action.league);
          this._emitChange();
          break;

      case Constants.ActionTypes.CREATE_LEAGUE:
          this._updateLeagueInfo(action.league);
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
