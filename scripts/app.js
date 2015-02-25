import React from 'react';
import Router from 'react-router';
import Dashboard from './components/dashboard.react';
import Login from './components/login.react';

let { DefaultRoute, Route, RouteHandler } = Router;

let App = React.createClass({

  render() {
    return (
      <div className="container">

        <RouteHandler/>
      </div>
    );
  }

});

let routes = <Route handler={App}>
  <Route name="login" handler={Login}/>
  <Route name="dashboard" handler={Dashboard}/>
</Route>

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("app"))
})
