import React from 'react/addons';
import Router from 'react-router';
import StatsActions from '../actions/stats-actions';
import StatsStore from '../stores/stats-store';

export default React.createClass({

  mixins: [Router.State],

  getInitialState() {
    return { stats: [] }
  },

  componentDidMount() {
    StatsStore.addChangeListener(this._onChange);
    StatsActions.getStats();
  },

  _getStatsFromStore() {
    let stats = StatsStore.getAllStats();
  },

  _onChange() {
    this._getStatsFromStore();
  },

  render() {
    let name = this.getParams().name;

    return (
      <div>
        <h1>{this.getParams().name} Draft Room</h1>
      </div>
    );
  }

});
