import React from 'react/addons';
import Router from 'react-router';
import UserActions from '../../actions/user-actions';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [ PureRenderMixin ],

  _login() {
    UserActions.userLogin();
  },

  render() {
    return (
      <div>
        <button onClick={this._login}>Login</button>
      </div>
    );
  }

});
