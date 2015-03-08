import alt from '../alt';
import DraftActionCreators from '../actions/draft-actions';

class DraftStore {

  constructor() {
    this.bindActions(DraftActionCreators);
    this._draftInfo = { status: {} };
  }

  onGetDraftStatusForID(status) {
    this._draftInfo.status = status;
  }

  onUpdateDraftStatus(status) {
    this._draftInfo.status = status;
  }

  static getDraftStatus() {
    return this.getState()._draftInfo.status;
  }

}

export default alt.createStore(DraftStore, 'DraftStore')
