import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';
import Firebase from 'firebase';
import LeagueActions from '../actions/league-actions';

/*
* Seems this is where vanilla flux breaks down,
* a little too much verboseness... can see
* where this could become un-manageable
*/

class LeagueStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.USER_LIST_CHANGE = 'user-list-change';
    this.FULL_LIST_CHANGE = 'full-list-change';
    this.NEW_LEAGUE_CHANGE = 'new-league-change';
    this.leaguesUserIsIn = { inLeague: false };
    this.newLeague = {};
    this.fullLeagueList = undefined;
  }

  addUserLeaguesChangeListener(callback) {
    this.on(this.USER_LIST_CHANGE, callback);
  }

  removeUserLeaguesChangeListener(callback) {
    this.removeListener(this.USER_LIST_CHANGE, callback);
  }

  addAllLeaguesChangeListener(callback) {
    this.on(this.FULL_LIST_CHANGE, callback);
  }

  removeAllLeaguesListChangeListener(callback) {
    this.removeListener(this.FULL_LIST_CHANGE, callback);
  }

  addNewLeagueListener(callback) {
    this.on(this.NEW_LEAGUE_CHANGE, callback);
  }

  removeNewLeagueListChangeListener(callback) {
    this.removeListener(this.NEW_LEAGUE_CHANGE, callback);
  }

  getLeaguesUserIsIn() {
    return this.leaguesUserIsIn;
  }

  getFullLeaguesList() {
    return this.fullLeagueList;
  }

  getLeagueForID(id) {
    return this.fullLeagueList[id] || {};
  }

  getNewLeague() {
    return this.newLeague;
  }

  _emitChange(e) {
    this.emit(e);
  }

  _addNewMember(user) {
    // TODO
  }

  _updateLeaguesUserIsIn(leagues) {

    // TODO: fix this mapping, it's so messy to do it here?

    let userLeagues = [];

    for(var key in leagues.info) {
      if(leagues.info[key].name) {
        userLeagues.push(leagues.info[key].name);
      }
    }

    leagues.info = userLeagues;

    this.leaguesUserIsIn = leagues;
  }

  _updateFullLeagueList(leagues) {
    this.fullLeagueList = leagues;
  }

  _newLeagueAdded(league) {
    this.newLeague = league;
    (this.fullLeagueList || {})[this.newLeague.info.name] = this.newLeague;
    this.leaguesUserIsIn.info.push(this.newLeague.info.name);
  }

  _dispatchToken(action) {

    switch(action.type) {

      case Constants.ActionTypes.USER_LOGIN:
          this._updateLeaguesUserIsIn(action.user.leaguesUserIsIn);
          this._emitChange(this.USER_LIST_CHANGE);
          break;

      case Constants.ActionTypes.RECEIVE_LEAGUES_USER_IS_IN:
          this._updateLeaguesUserIsIn(action.league);
          this._emitChange(this.USER_LIST_CHANGE);
          break;

      case Constants.ActionTypes.RECEIVE_ALL_LEAGUES:
          this._updateFullLeagueList(action.leagues);
          this._emitChange(this.FULL_LIST_CHANGE);
          break;

      case Constants.ActionTypes.CREATE_LEAGUE:
          this._newLeagueAdded(action.league);
          this._emitChange(this.NEW_LEAGUE_CHANGE);
          break;

      case Constants.ActionTypes.ADD_NEW_MEMBER:
          this._addNewMember(action.user);
          this._emitChange(this.USER_LIST_CHANGE);
          break;

        default:
          // no op
    }
  }
}

let ls = new LeagueStore();
export default ls;
