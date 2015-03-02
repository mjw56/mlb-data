import React from 'react/addons';
import LeagueStore from '../../stores/league-store';
import UserStore from '../../stores/user-store';
import LeagueActions from '../../actions/league-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { showForm: false };
  },

  _toggleForm() {
    this.setState({ showForm: !this.state.showForm });
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
        <h4 onClick={this._toggleForm}>Create A League</h4>
        { this.state.showForm ?
          <form onSubmit={this._createLeague}>
            <input type="text" ref="leagueName" placeholder="League Name" />
            <button type="submit">Create League!</button>
          </form> :
          null
        }
      </div>
    );
  }

});
