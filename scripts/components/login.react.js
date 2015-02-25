import React from 'react/addons';
import Router from 'react-router';
import Firebase from 'firebase';
import UserActions from '../actions/user-actions';
import UserStore from '../stores/user-store';

let PureRenderMixin = React.addons.PureRenderMixin;

export default React.createClass({

  mixins: [ Router.Navigation, PureRenderMixin ],

  statics: {
    attemptedTransition: null
  },

  getInitialState() {

    return {
      loggedIn: false,
      user: {}
    }
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },

  _getUserFromStore() {

    let user = UserStore.getUserInfo();

    this.setState({
      loggedIn: user.loggedIn,
      user: user.user
    });

  },

  _login() {
    let ref = new Firebase(process.env.FIREBASE_URL);

    ref.authWithOAuthPopup("github", (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

        UserActions.userLogin({
          id: authData.uid,
          name: authData.github.displayName
        });

        this.replaceWith('/dashboard');
      }
    });
  },

  _logout() {
    UserActions.userLogout();
  },

  _onChange() {
    this._getUserFromStore();
  },

  render() {
    return (
      <div>
        <button onClick={this._login}>Login</button>
      </div>
    );
  }

});
