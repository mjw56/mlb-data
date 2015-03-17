import React from 'react/addons';
import LeagueStore from '../../stores/league-store';
import DraftClock from './draft-clock.react';
import DraftActions from '../../actions/draft-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  _nextPick() {

    if(this.props.details.completed) return;

    let next,
        round = this.props.details.round,
        onTheClock = this.props.details.onTheClock;

    if(onTheClock === this.props.details.members.length-1) {
      round++;
      next = 0;
    } else {
      next = onTheClock + 1;
    }

    if(round > 12) {
      DraftActions.updateDraftDetails({ id: this.props.id, details: { started: false, completed: true, round: 12 } });
      return;
    }

    if(this.props.user.id === this.props.details.members[next].id) {
      console.log('you are on the clock!', round)
    }

    DraftActions.updateDraftDetails({ id: this.props.id, details: { onTheClock: next, round: round } });

    this.forceUpdate();
  },

  render() {

    let members = (this.props.details.members || []).map((member, i) => {

      let elem;

      if(i === this.props.details.onTheClock) {
        elem = <h4 style={{ border: '1px solid green'}}>{member.id}</h4>;
      } else {
        elem = <h4>{member.id}</h4>;
      }

      return elem;
    });

    return (
      <div>
        <DraftClock nextPick={this._nextPick} pick={this.props.details.onTheClock} {...this.props} />
        <h3>{this.props.id} Member List</h3>
        {members}
      </div>
    );
  }

});
