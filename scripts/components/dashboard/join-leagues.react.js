import React from 'react/addons';
import Router from 'react-router';
import LeagueStore from '../../stores/league-store';
import UserStore from '../../stores/user-store';
import LeagueActions from '../../actions/league-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin, Router.Navigation],

  getInitialState() {
    return { showList: false, list: [] };
  },

  componentDidMount() {
    LeagueStore.addAllLeaguesChangeListener(this._onChange);

    LeagueActions.getAllLeagues();
  },

  _toggleList() {
    this.setState({ showList: !this.state.showList });
  },

  _onChange() {
    this.setState({ list: Object.keys(LeagueStore.getFullLeaguesList()) })
  },

  _createLeague(e) {
    e.preventDefault();
    LeagueActions.createLeague({
      ownerId: UserStore.getUserInfo().user.id,
      name: this.refs.leagueName.getDOMNode().value,
      members: [UserStore.getUserInfo().user.id]
    });
  },

  _joinLeague(event) {
    // TODO: call to firebase to add member to league id
    this.transitionTo('draft-room', {name: event.currentTarget.innerText});
  },

  render() {

    let leagues = this.state.list.map((league) => {
      return <h5 onClick={this._joinLeague} key={league}>{league}</h5>;
    });

    return (
      <div>
        <h4 onClick={this._toggleList}>Join A League</h4>
        { this.state.showList ?
          leagues:
          null
        }
      </div>
    );
  }

});
