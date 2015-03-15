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
    this._draftDetails = details;
  }

  onAddPlayerToRoster(details) {
    this._draftDetails = details;
  }

  static getDraftStatus() {
    return this.getState()._draftDetails.started;
  }

  static getDraftDetails() {
    return this.getState()._draftDetails;
  }

}

export default alt.createStore(DraftStore, 'DraftStore')
