import alt from 'utils/alt';
import api from 'utils/api';
import {clone} from 'lodash';
import {networkAction} from 'utils/action-utils';

class DirectorsActions {
  constructor() {
    this.generateActions('removeCurrent');
  }
  fetch() {
    networkAction(this, api.directors.getAll);
  }
  get(id) {
    networkAction(this, api.directors.get, id);
  }
  add(data) {
    networkAction(this, api.directors.post, clone(data));
  }
  update(id, data) {
    networkAction(this, api.directors.put, id, clone(data));
  }
  delete(id) {
    networkAction(this, api.directors.delete, id);
  }
}

module.exports = (alt.createActions(DirectorsActions));
