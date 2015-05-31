import alt from 'utils/alt';
import {defer} from 'lodash';
import api from 'utils/api';
import LoginActions from 'actions/login-actions';
import {routerObject} from 'utils/store-utils';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.user = null;
    this.error = null;
  }
  saveUser(data) {
    if (data.ok) {
      this.user = data.user;
      this.error = null;
      api.updateToken(this.user.token);
      defer(routerObject.transitionTo.bind(this, 'directors'));
    }
    else {
      api.updateToken(null);
      this.user = null;
      this.error = data.error.message;
    }
  }
  onLogin(data) {
    this.saveUser.bind(this)(data);
  }
  onRegister(data) {
    this.saveUser.bind(this)(data);
  }
  onLogout() {
    this.user = null;
    this.error = null;
    api.updateToken(null);
    defer(routerObject.transitionTo.bind(this, 'login'));
  }
}

module.exports = (alt.createStore(LoginStore));
