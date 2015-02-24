import Firebase from 'firebase';
import {Promise} from 'es6-promise';

let _findLeaguesForUserID = (user) => {

  let ref = new Firebase(process.env.FIREBASE_URL + "/mlb-data-app/leagues");

  let userInLeagues = false;

  return new Promise((resolve, reject) => {

    ref.once("value", (snapshot) => {

      userInLeagues = snapshot.val() ? true : false;

      resolve({ inLeagues: userInLeagues, leagues: snapshot.val() });

    }, (err) => {
      reject('failed to get firebase data ' + err.code);
    });

  });

}

export default {
  findLeaguesForUserID: _findLeaguesForUserID
}
