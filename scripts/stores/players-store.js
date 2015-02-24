import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';

class PlayersStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this._players = [];
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getAllPlayers() {
    return this._players || [];
  }

  getPlayer(id) {
    return this._players[id] || {};
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _setAllPlayers(players) {
    this._players = players;
  }

  _dispatchToken(action) {

    switch(action.type) {

      case Constants.ActionTypes.RECEIVE_PLAYERS_DATA:
          this._setAllPlayers(action.players);
          this._emitChange();
          break;

        default:
          // no op
    }
  }
}

let ps = new PlayersStore();
export default ps;
