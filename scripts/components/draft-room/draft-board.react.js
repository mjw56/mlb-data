import React from 'react/addons';
import PlayerList from './player-list.react';

export default React.createClass({

  render() {
    return (
      <div>
        <h3>Draft Board</h3>
        <PlayerList {...this.props} />
      </div>
    );
  }

});
