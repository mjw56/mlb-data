import React from 'react/addons';
import Firebase from 'firebase';
import StatsActions from '../actions/stats-actions';
import StatsStore from '../stores/stats-store';
import LeagueStore from '../stores/league-store';
import Authentication from '../utils/authentication';
import LeagueComponent from './league-info.react';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [Authentication, PureRenderMixin],

  render() {
    return (
      <div>
        <h1>MLB Draft App</h1>
        <LeagueComponent />
      </div>
    );
  }

});
