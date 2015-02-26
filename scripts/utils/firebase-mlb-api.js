import Firebase from 'firebase';
import {Promise} from 'es6-promise';

let _findLeaguesForUserID = (user) => {

  let ref = new Firebase(process.env.FIREBASE_URL + "/mlb-data-app/leagues");

  let userInLeague = false;

  return new Promise((resolve, reject) => {

    ref.once("value", (snapshot) => {

      userInLeague = snapshot.val() ? true : false;

      resolve({ inLeague: userInLeague, info: snapshot.val() });

    }, (err) => {
      reject('failed to get firebase data ' + err.code);
    });

  });

}

let _createLeague = (league) => {
  let ref = new Firebase(process.env.FIREBASE_URL + "/mlb-data-app/leagues");

  ref.set(league);

  return;
}

export default {
  findLeaguesForUserID: _findLeaguesForUserID,
  createLeague: _createLeague
}
