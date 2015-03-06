import React from 'react/addons';
import LeagueStore from '../../stores/league-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { members: [] }
  },

  componentDidMount() {
    this.setState({ members: LeagueStore.getLeagueForID(this.props.id).members });
  },

  render() {

    let members = this.state.members.map((member) => {
      return <h4>{member}</h4>;
    });

    return (
      <div>
        <h3>{this.props.id} Member List</h3>
        {members}
      </div>
    );
  }

});
