import React from 'react/addons';
import LeagueStore from '../stores/league-store';
import UserStore from '../stores/user-store';
import LeagueActions from '../actions/league-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { league: {}, signup: false };
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

  _createLeague(e) {
    e.preventDefault();
    LeagueActions.createLeague({
      ownerId: UserStore.getUserInfo().user.id,
      name: this.refs.leagueName.getDOMNode().value
    });
  },

  render() {
    return (
      <div>
        { this.state.league.inLeague ? <h4>{this.state.league.info}</h4> :
          <form onSubmit={this._createLeague}>
            <input type="text" ref="leagueName" placeholder="League Name" />
            <button type="submit">Create League!</button>
          </form>
        }
      </div>
    );
  }

});
