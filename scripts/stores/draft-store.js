import alt from '../alt';
import DraftActionCreators from '../actions/draft-actions';

class DraftStore {

  constructor() {
    this.bindActions(DraftActionCreators);
    this._draftDetails = { };
  }

  onGetDraftDetailsForId(details) {
    this._draftDetails = details;
  }

  onUpdateDraftStatus(details) {
    this._draftDetails.status = details.started;
  }

  static getDraftStatus() {
    return this.getState()._draftDetails.status;
  }

  static getDraftDetails() {
    return this.getState()._draftDetails;
  }

}

export default alt.createStore(DraftStore, 'DraftStore')
