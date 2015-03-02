import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Events from 'eventemitter3';

class DraftStore extends Events.EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this._dispatchToken.bind(this));
    this.CHANGE_EVENT = 'change';
    this.PLAYER_SELECTION_EVENT = 'draft-player-selection';
    this.DRAFT_STATUS_EVENT = 'draft-status';
    this.MEMBER_EVENT = 'draft-member-update';
    this.DRAFT_COMPLETE_EVENT = 'draft-complete';
    this._draftInfo = { status: {} };
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  addPlayerSelectionListener(callback) {
    this.on(this.PLAYER_SELECTION_EVENT, callback);
  }

  removePlayerSelectionListener(callback) {
    this.removeListener(this.PLAYER_SELECTION_EVENT, callback);
  }

  addDraftStatusListener(callback) {
    this.on(this.DRAFT_STATUS_EVENT, callback);
  }

  removeDraftStatusListener(callback) {
    this.removeListener(this.DRAFT_STATUS_EVENT, callback);
  }

  getDraftStatus() {
    return this._draftInfo.status;
  }

  getCurrentPosition() {
    //TODO
  }

  getActiveMembers() {
    //TODO
  }

  getStatus() {
    //TODO
  }

  _emitChange(e) {
    this.emit(e);
  }

  _setupDraftRoom(data) {
    this._draftInfo = data;
  }

  _updateDraftStatus(status) {
    this._draftInfo.status = status;
  }

  _playerSelected(info) {
    //TODO
  }

  _startDraft() {
    //TODO
  }

  _pauseDraft() {
    //TODO
  }

  _stopDraft() {
    //TODO
  }

  _cancelDraft() {
    //TODO
  }

  _memberJoined() {
    //TODO
  }

  _memberLeft() {
    //TODO
  }

  _tearDownDraftRoom() {
    //TODO
  }

  _dispatchToken(action) {

    // ugh

    switch(action.type) {

        case Constants.ActionTypes.DRAFT_ROOM_CREATED:
              this._setupDraftRoom(action.draftInfo);
              this._emitChange(this.CHANGE_EVENT);
              break;

        case Constants.ActionTypes.DRAFT_STATUS:
              this._updateDraftStatus(action.status);
              this._emitChange(this.DRAFT_STATUS_EVENT);
              break;

        case Constants.ActionTypes.DRAFT_COMPLETE:
              this._tearDownDraftRoom();
              this._emitChange(this.DRAFT_COMPLETE_EVENT);
              break;

        case Constants.ActionTypes.MEMBER_JOINED:
              this._memberJoined(action.member);
              this._emitChange(this.MEMBER_EVENT);
              break;

        case Constants.ActionTypes.MEMBER_LEFT:
              this._memberLeft(action.member);
              this._emitChange(this.MEMBER_EVENT);
              break;

        case Constants.ActionTypes.PLAYER_SELECTED:
              this._playerSelected(action.selectionInfo);
              this._emitChange(this.PLAYER_SELECTION_EVENT);
              break;

        case Constants.ActionTypes.START_DRAFT:
              this._startDraft();
              this._emitChange(this.DRAFT_STATUS_EVENT);
              break;

        case Constants.ActionTypes.PAUSE_DRAFT:
              this._pauseDraft();
              this._emitChange(this.DRAFT_STATUS_EVENT);
              break;

        case Constants.ActionTypes.STOP_DRAFT:
              this._stopDraft();
              this._emitChange(this.DRAFT_STATUS_EVENT);
              break;

        case Constants.ActionTypes.CANCEL_DRAFT:
              this._cancelDraft();
              this._emitChange(this.DRAFT_STATUS_EVENT);
              break;

        default:
          // no op
    }
  }
}

let ds = new DraftStore();
export default ds;
