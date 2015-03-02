import Dispatcher from '../utils/dispatcher';
import Constants from '../constants/constants';
import Firebase from 'firebase';
import firebaseAPI from '../utils/firebase-mlb-api';

class DraftActions {

  constructor() {}

  getDraftStatusForID(id) {
    firebaseAPI.getDraftStatusForID(id).then((result) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.DRAFT_STATUS,
        status: result
      });
    });
  }

  updateDraftStatus(update) {
    firebaseAPI.updateDraftStatus(update).then((result) => {
      Dispatcher.handleAction({
        type: Constants.ActionTypes.DRAFT_STATUS,
        status: result
      });
    });
  }

}

let da = new DraftActions();
export default da;
