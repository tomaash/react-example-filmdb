'use strict';
import axios from 'axios';

export default class LoginActions {
  constructor() {
    this.generateActions('logout');
  }
  async login(data) {
    try {
      const response = await axios.post('/auth/login', data);
      this.dispatch({ok: true, user: response.data});
    } catch (err) {
      console.error(err);
      this.dispatch({ok: false, error: err.data});
    }
  }
  async register(data) {
    try {
      const response = await axios.post('/auth/register', data);
      this.dispatch({ok: true, user: response.data});
    } catch (err) {
      console.error(err);
      this.dispatch({ok: false, error: err.data});
    }
  }
}
