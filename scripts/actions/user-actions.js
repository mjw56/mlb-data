import alt from '../alt';
import firebaseAPI from '../utils/firebase-mlb-api';

class UserActions {

  userLogin(user) {
    firebaseAPI.authenticateUser().then((user) => {
      //firebaseAPI.clearData(user.id);
      this.dispatch(user);
    });
  }

  userLogout() {
    this.dispatch();
  }

}

export default alt.createActions(UserActions);
