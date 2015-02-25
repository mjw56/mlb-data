import React from 'react/addons';
import LeagueStore from '../stores/league-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { league: {} };
  },

  componentDidMount() {
    LeagueStore.addChangeListener(this._onChange);
  },

  _getLeagueFromStore() {

    let league = LeagueStore.getLeague();

    this.setState( { league: league });
  },

  _onChange() {
    this._getLeagueFromStore();
  },

  render() {
    return (
      <div>
        { this.state.league.inLeague ?
          <h4>{this.state.league.info}</h4>
          :
          <button>Join League</button>
        }
      </div>
    );
  }

});
