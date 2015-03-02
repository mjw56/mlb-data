import React from 'react';
import Router from 'react-router';
import Dashboard from './components/dashboard/main.react';
import Authentication from './utils/authentication';
import Login from './components/login/main.react';
import DraftRoom from './components/draft-room/main.react';
import LeagueStore from './stores/league-store';

let { DefaultRoute, Route, RouteHandler, Link } = Router;

let App = React.createClass({

  mixins: [Router.Navigation],

  /*
  * The main app component can listen for
  * certain changes from stores to trigger
  * route changes
  *
  * TODO: move to a mixin?
  */
  componentDidMount() {
      LeagueStore.addNewLeagueListener(this._newLeagueAdded);
  },

  _newLeagueAdded() {
    let newLeague = LeagueStore.getNewLeague();

    this.transitionTo('draft-room', {name: newLeague.info.name});
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
