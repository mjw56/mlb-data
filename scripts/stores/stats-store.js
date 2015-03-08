import alt from '../alt';
import StatsActionCreators from '../actions/stats-actions';
import sortByAll from 'lodash.sortbyall';

class StatsStore {

  constructor() {
    this.bindActions(StatsActionCreators);
    this._stats = [];
  }

  onGetStats(stats) {
    this._stats = sortByAll(stats, ["FantasyPoints"]).reverse();
  }

  static getAllStats() {
    return this.getState()._stats;
  }

  static getStatsForPlayer(id) {
    return this.getState()._stats[id] || {};
  }

}

export default alt.createStore(StatsStore, 'StatsStore');
