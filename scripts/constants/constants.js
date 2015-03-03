import KeyMirror from 'keymirror';

class Constants {

  constructor() {
    this.ActionTypes = KeyMirror({

      USER_LOGIN: null,
      USER_LOGOUT: null,

      DRAFT_ROOM_CREATED: null,
      DRAFT_STATUS: null,
      DRAFT_COMPLETE: null,
      PLAYER_SELECTED: null,
      START_DRAFT: null,
      PAUSE_DRAFT: null,
      STOP_DRAFT: null,
      CANCEL_DRAFT: null,
      MEMBER_JOINED: null,
      MEMBER_LEFT: null,

      RECEIVE_PLAYER_STATS: null,
      RECEIVE_PLAYERS_DATA: null,
      RECEIVE_LEAGUES_USER_IS_IN: null,
      RECEIVE_ALL_LEAGUES: null,

      CREATE_LEAGUE: null,
      JOINED_LEAGUE: null,
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
