import React from 'react/addons';
import LeagueActions from '../../actions/league-actions';
import LeagueStore from '../../stores/league-store';
import Authentication from '../../utils/authentication';
import YourLeaguesComponent from './your-leagues.react';
import StartLeagueComponent from './start-league.react';
import JoinLeagueComponent from './join-leagues.react';
import UserStore from '../../stores/user-store';
import ListenerMixin from 'alt/mixins/ListenerMixin';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [Authentication, PureRenderMixin, ListenerMixin],

  getInitialState() {
    return { usersLeagues: {}, allLeagues: {} };
  },

  componentDidMount() {
    LeagueStore.getEventEmitter().on('league-store: allLeagues', this._allLeaguesUpdate);
    this.setState({usersLeagues: LeagueStore.getLeaguesUserIsIn() });
    LeagueActions.getAllLeagues();
  },

  _getLeagueFromStore() {
    this.setState( { usersLeagues: LeagueStore.getLeaguesUserIsIn() });
  },

  _allLeaguesUpdate(leagues) {
    this.setState({ allLeagues: LeagueStore.getFullLeaguesList() });
  },

  render() {
    return (
      <div>
        <h1>MLB Draft App</h1>
        <YourLeaguesComponent leagues={this.state.usersLeagues}/>
        <JoinLeagueComponent leagues={this.state.allLeagues}/>
        <StartLeagueComponent />
      </div>
    );
  }

});
