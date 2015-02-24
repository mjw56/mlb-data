import React from 'react';
import Router from 'react-router';
import Home from './components/dashboard.react';

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
  <DefaultRoute name="home" handler={Home}/>
</Route>

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById("app"))
})
