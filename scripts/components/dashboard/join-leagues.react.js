import React from 'react/addons';
import Router from 'react-router';
import LeagueStore from '../../stores/league-store';
import UserStore from '../../stores/user-store';
import LeagueActions from '../../actions/league-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin, Router.Navigation],

  getInitialState() {
    return { showList: false };
  },

  _toggleList() {
    this.setState({ showList: !this.state.showList });
  },

  _joinLeague(event) {
    LeagueActions.joinLeague(event.currentTarget.innerText, UserStore.getUserInfo().user.id);
  },

  render() {

    let leagues = Object.keys(this.props.leagues || {} ).map((league) => {
      return <h5 onClick={this._joinLeague} key={league.name}>{league}</h5>;
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
