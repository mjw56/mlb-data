import React from 'react/addons';
import Firebase from 'firebase';
import LeagueStore from '../../stores/league-store';
import Authentication from '../../utils/authentication';
import YourLeaguesComponent from './your-leagues.react';
import StartLeagueComponent from './start-league.react';
import JoinLeagueComponent from './join-leagues.react';
import UserStore from '../../stores/user-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [Authentication, PureRenderMixin],

  getInitialState() {
    return { league: {} };
  },

  componentDidMount() {
    LeagueStore.addUserLeaguesChangeListener(this._onChange);

    this.setState({league: LeagueStore.getLeaguesUserIsIn() });
  },

  _getLeagueFromStore() {
    this.setState( { league: LeagueStore.getLeaguesUserIsIn() });
  },

  _onChange() {
    this._getLeagueFromStore();
  },

  render() {
    return (
      <div>
        <h1>MLB Draft App</h1>
        <YourLeaguesComponent league={this.state.league}/>
        <JoinLeagueComponent />
        <StartLeagueComponent />
      </div>
    );
  }

});
