import KeyMirror from 'keymirror';

class Constants {

  constructor() {
    this.ActionTypes = KeyMirror({

      USER_LOGIN: null,
      USER_LOGOUT: null,

      RECEIVE_PLAYER_STATS: null,
      RECEIVE_PLAYERS_DATA: null,
      RECEIVE_USER_LEAGUE_INFO: null,

      CREATE_LEAGUE: null,
      ADD_NEW_MEMBER: null,
      CREATE_TEAM: null,
      ADD_NEW_PLAYER: null
    });

    this.PayloadSources = KeyMirror({
      SERVER_ACTION: null,
      VIEW_ACTION: null
    });
  }

}

let c = new Constants();
export default c;
