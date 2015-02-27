import React from 'react';
import Router from 'react-router';
import Dashboard from './components/dashboard.react';
import Authentication from './utils/authentication';
import Login from './components/login.react';
import DraftRoom from './components/draft-room.react';

let { DefaultRoute, Route, RouteHandler, Link } = Router;

let App = React.createClass({

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
  <Route name="draft-room" handler={DraftRoom}/>
</Route>

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("app"))
})
