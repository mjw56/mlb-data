import React from 'react/addons';
import Router from 'react-router';
import StatsActions from '../../actions/stats-actions';
import DraftActions from '../../actions/draft-actions';
import StatsStore from '../../stores/stats-store';
import LeagueStore from '../../stores/league-store';
import DraftStore from '../../stores/draft-store';
import DraftStatus from './draft-status.react';
import DraftBoard from './draft-board.react';
import Memberboard from './member-board.react';
import Helpers from '../../utils/helpers';
import ListenerMixin from 'alt/mixins/ListenerMixin';

let PureRenderMixin = React.addons.PureRenderMixin;

/**
 * Drafts are snapshottable
 *
 * memberList, draftPosition, playerSelectionBoard,
 * team selections
 *
 */

export default React.createClass({

  mixins: [Router.State, PureRenderMixin, ListenerMixin],

  getInitialState() {
    return { stats: [], members: [], league: {}, status: false }
  },

  componentDidMount() {
    this.listenTo(StatsStore, this._updatePlayerStats);
    this.listenTo(DraftStore, this._updateDraftStatus);
    DraftActions.getDraftStatusForID(this.props.id);
    StatsActions.getStats();

    this.setState({
      league: LeagueStore.getLeagueForID(this.getParams().name),
      members: Helpers.knuthShuffle(LeagueStore.getLeagueForID(this.getParams().name).members)
    });
  },

  _getStatsFromStore() {
    this.setState({
      stats: StatsStore.getAllStats()
    });
  },

  _updatePlayerStats() {
    this._getStatsFromStore();
  },

  _updateDraftStatus() {
    this.setState({ status: DraftStore.getDraftStatus() });
  },

  render() {
    let name = this.getParams().name;

    return (
      <div>
        <h1>{this.getParams().name} Draft Room</h1>
        <DraftStatus id={this.getParams().name} status={this.state.status} />
        <Memberboard id={this.getParams().name} members={this.state.members} status={this.state.status} />
        <DraftBoard players={this.state.stats} />
      </div>
    );
  }

});
