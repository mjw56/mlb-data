import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';

class TeamStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this._roster = [];
    this._name = '';
    this._owner = {};
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

  getOwner() {
    return this._owner;
  }

  getRoster() {
    return this._roster;
  }

  _emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  _createTeam(team) {
    this._name = team.name;
    this._owner = team.owner;
  }

  _addPlayer(player) {
    this._roster.push(player);
  }

  _dispatchToken(action) {

    switch(action.type) {

    case Constants.ActionTypes.CREATE_TEAM:
          this._createTeam(action.team);
          this._emitChange();
          break;

    case Constants.ActionTypes.ADD_NEW_PLAYER:
          this._addPlayer(action.player);
          this._emitChange();
          break;

        default:
          // no op
    }
  }
}

let ts = new TeamStore();
export default ts;
