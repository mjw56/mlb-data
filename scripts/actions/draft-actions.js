import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class DraftActions {

  getDraftDetailsForId(id) {
    firebaseAPI.getDraftDetailsForId(id).then((result) => {
      this.dispatch(result);
    });
  }

  updateDraftStatus(update) {
    firebaseAPI.updateDraftStatus(update).then((result) => {
      this.dispatch(result);
    });
  }

  addPlayerToRoster(leagueId, user, player) {
    firebaseAPI.addPlayerToRoster(leagueId, user, player).then((result) => {
      this.dispatch(result);
    });
  }

}

export default alt.createActions(DraftActions);
