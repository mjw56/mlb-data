import React from 'react';
import Router from 'react-router';
import Dashboard from './components/dashboard/main.react';
import Authentication from './utils/authentication';
import Login from './components/login/main.react';
import DraftRoom from './components/draft-room/main.react';
import LeagueStore from './stores/league-store';
import UserStore from './stores/user-store';
import ListenerMixin from 'alt/mixins/ListenerMixin';

let { DefaultRoute, Route, RouteHandler, Link } = Router;

let App = React.createClass({

  mixins: [Router.Navigation, ListenerMixin],

  statics: {
    attemptedTransition: null
  },

  /*
  * The main app component can listen for
  * certain changes from stores to trigger
  * route changes
  *
  * TODO: move to a mixin?
  */
  componentDidMount() {
      this.listenTo(LeagueStore, this._newLeagueAdded);
      this.listenTo(UserStore, this._userChange);
      LeagueStore.getEventEmitter().on('league-store: joinedLeague', this._joinedLeague);
  },

  /* Listen for new league added by user and join draft room */
  _newLeagueAdded() {
    let newLeague = LeagueStore.getNewLeague();

    this.transitionTo('draft-room', {name: newLeague.info.name});
  },

  /* Listen for league that user joined and join draft room */
  _joinedLeague() {
    this.transitionTo('draft-room', {name:  LeagueStore.getLeagueJoining() });
  },

  /* Listen for when user logged in and re-direct to dashboard */
  _userChange() {
    let user = UserStore.getUserInfo();

    if((user || {}).loggedIn) {
      this.replaceWith('/dashboard');
    }
  },

  render() {
    return (
      <div className="container">

        <ul>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>

        <RouteHandler/>
      </div>
    );
  }

});

let routes = <Route handler={App}>
  <Route name="login" handler={Login}/>
  <Route name="dashboard" handler={Dashboard}/>
  <Route name="draft-room" path="/draft-room/:name" handler={DraftRoom}/>
</Route>

Router.run(routes, function(Handler, state) {
  React.render(<Handler/>, document.getElementById("app"))
});
