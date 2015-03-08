import alt from '../alt';
import LeagueActionCreators from '../actions/league-actions';
import UserActionCreators from '../actions/user-actions';
import UserStore from './user-store';

class LeagueStore {

  constructor() {
    this.bindActions(LeagueActionCreators);
    this.bindActions(UserActionCreators);

    this.leaguesUserIsIn = { inLeague: false };
    this.newLeague = {};
    this.leagueJoining = '';
    this.fullLeagueList = undefined;
  }

  onFindLeaguesForUser(leagues) {
    this.fullLeagueList = leagues;
  }

  onCreateLeague(league) {
    this.newLeague = league;
    (this.fullLeagueList || {})[this.newLeague.info.name] = this.newLeague;
    this.leaguesUserIsIn.info.push(this.newLeague.info.name);
  }

  onGetAllLeagues(leagues) {
    this.fullLeagueList = leagues;
    this.getInstance().getEventEmitter().emit('league-store: allLeagues');
  }

  onJoinLeague(info) {
    this.leagueJoining = info.name;
    this.fullLeagueList[info.name].members.push(info.userId);
    this.getInstance().getEventEmitter().emit('league-store: joinedLeague')
  }

  onUserLogin(leagues) {
    // TODO: fix this mapping, it's so messy to do it here?
    this.waitFor(UserStore.dispatchToken)

    let userLeagues = [],
        leagues = leagues.leaguesUserIsIn;

    for(var key in leagues.info) {
      if(leagues.info[key].name) {
        userLeagues.push(leagues.info[key].name);
      }
    }

    leagues.info = userLeagues;

    this.leaguesUserIsIn = leagues;
  }

  static getLeaguesUserIsIn() {
    return this.getState().leaguesUserIsIn;
  }

  static getFullLeaguesList() {
    return this.getState().fullLeagueList;
  }

  static getLeagueForID(id) {
    return this.getState().fullLeagueList[id] || {};
  }

  static getNewLeague() {
    return this.getState().newLeague;
  }

  static getLeagueJoining() {
    return this.getState().leagueJoining;
  }

  static getOwnerForLeagueID(id) {

  }

}

export default alt.createStore(LeagueStore, 'LeagueStore')
