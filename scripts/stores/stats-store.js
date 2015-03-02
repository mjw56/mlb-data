import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';
import sortByAll from 'lodash.sortbyall';

class StatsStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this._stats = [];
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getAllStats() {
    return this._stats;
  }

  getStatsForPlayer(id) {
    return this._stats[id] || {};
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _setAllStats(stats) {
    this._stats = sortByAll(stats, ["FantasyPoints"]).reverse();
  }

  _dispatchToken(action) {

    switch(action.type) {

      case Constants.ActionTypes.RECEIVE_PLAYER_STATS:
          this._setAllStats(action.stats);
          this._emitChange();
          break;

        default:
          // no op
    }
  }
}

let ss = new StatsStore();
export default ss;
