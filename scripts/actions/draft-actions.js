import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class DraftActions {
  
  getDraftStatusForID(id) {
    firebaseAPI.getDraftStatusForID(id).then((result) => {
      this.dispatch(result);
    });
  }

  updateDraftStatus(update) {
    firebaseAPI.updateDraftStatus(update).then((result) => {
      this.dispatch(result);
    });
  }

}

export default alt.createActions(DraftActions);
