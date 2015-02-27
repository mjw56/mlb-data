import Firebase from 'firebase';
import {Promise} from 'es6-promise';

let _authenticateUser = () => {
  let ref = new Firebase(process.env.FIREBASE_URL);

  return new Promise((resolve, reject) => {

    ref.authWithOAuthPopup("github", (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
        reject();
      } else {
        console.log("Authenticated successfully with payload:", authData);

        let userRef = ref.child('users').child(authData.uid).update({
          id: authData.uid,
          name: authData.github.displayName
        });

        resolve({
          id: authData.uid,
          name: authData.github.displayName
        });
      }
    });

  });
}

let _findLeaguesForUserID = (user) => {

  let ref = new Firebase(process.env.FIREBASE_URL + '/users/' + user + '/leagues');

  let userInLeague = false;

  return new Promise((resolve, reject) => {

    ref.once("value", (snapshot) => {

      userInLeague = snapshot.val() ? true : false;

      resolve({ inLeague: userInLeague, info: snapshot.val() });

    }, (err) => {
      reject(err.code);
    });

  });

}

let _createLeague = (info) => {

  console.log("saving at: " + process.env.FIREBASE_URL + "/mlb-data-app/leagues");

  let ref = new Firebase(process.env.FIREBASE_URL);

  ref.child('mlb-data-app').child('leagues').set(info);
  ref.child('users').child(info.ownerId).update({
    'leagues': [info.name]
  });
}

let _getPlayerStats = () => {
  return new Promise((resolve, reject) => {
    let ref = new Firebase(process.env.FIREBASE_URL + "/mlb-data-app/players-stats");

    ref.on("value", (snapshot) => {
      resolve(snapshot);
    }, (err) => {
      console.log('failed to get firebase data ' + err.code);
      reject(err.code);
    });
  });
}

export default {
  authenticateUser: _authenticateUser,
  findLeaguesForUserID: _findLeaguesForUserID,
  createLeague: _createLeague,
  getPlayerStats: _getPlayerStats
}
