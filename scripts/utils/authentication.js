import UserStore from '../stores/user-store';
import Login from '../components/login/main.react';

export default {
  statics: {
    willTransitionTo: function (transition) {
      if (!UserStore.isAuth()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};
