'use strict';
import {defer} from 'lodash';
import api from 'utils/api';
// import {assign} from 'lodash';
// import {findItemById, findIndexById} from 'utils/store-utils';

export default class LoginStore {
  constructor() {
    this.bindActions(this.alt.getActions('login'));
    this.user = null;
    this.error = null;
  }
  saveUser(data) {
    if (data.ok) {
      this.user = data.user;
      this.error = null;
      api.updateToken(this.user.token);
      defer(this.alt.router.transitionTo.bind(this, 'directors'));
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
    defer(this.alt.router.transitionTo.bind(this, 'login'));
  }
}
