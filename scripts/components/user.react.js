import React from 'react';
import Firebase from 'firebase';
import UserActions from '../actions/user-actions';
import UserStore from '../stores/user-store';

export default React.createClass({

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

    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        UserActions.userLogin({
          id: authData.uid,
          name: authData.github.displayName
        });
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
        { this.state.loggedIn ?

            <div>
              <span>{this.state.user.name}</span>
              <button onClick={this._logout}>Logout</button>
            </div>
          :
            <button onClick={this._login}>Login</button>
        }
      </div>
    );
  }

});
