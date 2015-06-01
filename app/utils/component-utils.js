import LoginActions from 'actions/login-actions';
import LoginStore from 'stores/login-store';

export default {
  changeHandler: function(target) {
    target.prototype.changeHandler = function(key, attr, event) {
      var state = {};
      state[key] = this.state[key] || {};
      state[key][attr] = event.currentTarget.value;
      this.setState(state);
    };
    return target;
  },
  authDecorator: function(target) {
    target.willTransitionTo = function(transition) {
      console.log(transition);
      if (!LoginStore.getState().user) {
        transition.redirect('/login');
      }
    };
    return target;
  }
};
