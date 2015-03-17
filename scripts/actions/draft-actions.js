import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class DraftActions {

  getDraftDetailsForId(id) {
    firebaseAPI.getDraftDetailsForId(id).then((result) => {
      this.dispatch(result);
    });
  }

  updateDraftDetails(update) {
    firebaseAPI.updateDraftDetails(update).then((result) => {
      this.dispatch(result);
    });
  }

  addPlayerToRoster(leagueId, user, player) {
    firebaseAPI.addPlayerToRoster(leagueId, user, player).then((result) => {
      // dispatch the whole updated draft object
      this.dispatch(result);
    });
  }

}

export default alt.createActions(DraftActions);
