import React from 'react/addons';
import LeagueStore from '../../stores/league-store';
import DraftClock from './draft-clock.react';
import UserStore from '../../stores/user-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { round: 0, onTheClock: 0 };
  },

  _nextPick() {
    let next,
        round = this.state.round;

    if(this.state.onTheClock === this.props.members.length-1) {
      round++;
      next = 0;
    } else {
      next = this.state.onTheClock + 1;

      if(UserStore.getUserInfo().user.id === this.props.members[next]) {
        console.log('you are on the clock!')
      }

    }

    if(round > 12) {
      // draft is over
    }

    this.setState({ onTheClock: next });
  },

  render() {

    let members = this.props.members.map((member, i) => {

      let elem;

      if(i === this.state.onTheClock) {
        elem = <h4 style={{ border: '1px solid green'}}>{member}</h4>;
      } else {
        elem = <h4>{member}</h4>;
      }

      return elem;
    });

    return (
      <div>
        <DraftClock nextPick={this._nextPick} pick={this.state.onTheClock} started={this.props.status} />
        <h3>{this.props.id} Member List</h3>
        {members}
      </div>
    );
  }

});
