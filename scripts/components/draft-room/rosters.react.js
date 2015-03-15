import React from 'react/addons';

export default React.createClass({

  _createRoster(user) {
    return <div><h3>{user.id} roster</h3>
      {(Object.keys(user.team || {}) || []).map((key) => {
          return <p>{user.team[key].Name}</p>;
      })}</div>
  },

  render() {
    return (
      <div>
        {(this.props.members || []).map(this._createRoster)}
      </div>
    );
  }

});
