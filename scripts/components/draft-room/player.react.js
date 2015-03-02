import React from 'react/addons';
import DraftActions from '../../actions/draft-actions';

export default React.createClass({

  render() {
    return (
      <tr onClick={this._selectPlayer}>
        <td></td>
        <td>{this.props.player.Name}</td>
        <td>{this.props.player.Position}</td>
        <td>{this.props.player.FantasyPoints}</td>
        <td>{this.props.player.Games}</td>
      </tr>
    );
  }

});
