'use strict';
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
    }
    else {
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
  }
}
