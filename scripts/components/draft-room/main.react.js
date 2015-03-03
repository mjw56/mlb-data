import React from 'react/addons';
import Router from 'react-router';
import DraftActions from '../../actions/draft-actions';
import StatsActions from '../../actions/stats-actions';
import StatsStore from '../../stores/stats-store';
import LeagueStore from '../../stores/league-store';
import DraftStatus from './draft-status.react';
import DraftBoard from './draft-board.react';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [Router.State, PureRenderMixin],

  getInitialState() {
    return { stats: [], league: {} }
  },

  componentDidMount() {
    StatsStore.addChangeListener(this._onChange);
    StatsActions.getStats();

    this.setState({
      league: LeagueStore.getLeagueForID(this.getParams().name)
    });
  },

  componentWillUnmount() {
    StatsStore.removeChangeListener(this._onChange);
  },

  _getStatsFromStore() {
    this.setState({
      stats: StatsStore.getAllStats()
    });
  },

  _onChange() {
    this._getStatsFromStore();
  },

  render() {
    let name = this.getParams().name;

    return (
      <div>
        <h1>{this.getParams().name} Draft Room</h1>
        <DraftStatus id={this.getParams().name} />
        <DraftBoard players={this.state.stats} />
      </div>
    );
  }

});
