import React from 'react/addons';
import Router from 'react-router';
import LeagueStore from '../stores/league-store';
import UserStore from '../stores/user-store';
import LeagueActions from '../actions/league-actions';

let { Link } = Router;
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

  _createLeague(e) {
    e.preventDefault();
    LeagueActions.createLeague({
      ownerId: UserStore.getUserInfo().user.id,
      name: this.refs.leagueName.getDOMNode().value,
      members: [UserStore.getUserInfo().user.id]
    });
  },

  render() {
    return (
      <div>
        { this.state.league.inLeague ?
          <div>
            <h4>Your Leagues: {this.state.league.info}</h4>
            <ul>
              <li><Link to="draft-room" params={{ name: this.state.league.info }}>Open Draft Room</Link></li>
            </ul>
          </div>
        :
          <form onSubmit={this._createLeague}>
            <input type="text" ref="leagueName" placeholder="League Name" />
            <button type="submit">Create League!</button>
          </form>
        }
      </div>
    );
  }

});
