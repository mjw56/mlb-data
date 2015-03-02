import React from 'react/addons';
import Router from 'react-router';
import Firebase from 'firebase';
import UserActions from '../../actions/user-actions';
import UserStore from '../../stores/user-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [ Router.Navigation, PureRenderMixin ],

  statics: {
    attemptedTransition: null
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },

  _getStateFromStore() {
    let user = UserStore.getUserInfo();

    if(user.loggedIn) {
      this.replaceWith('/dashboard');
    }
  },

  _login() {
    UserActions.userLogin();
  },

  _onChange() {
    this._getStateFromStore();
  },

  render() {
    return (
      <div>
        <button onClick={this._login}>Login</button>
      </div>
    );
  }

});
