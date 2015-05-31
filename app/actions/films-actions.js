import alt from 'utils/alt';
import api from 'utils/api';
import {clone} from 'lodash';
import {networkAction} from 'utils/action-utils';

class FilmsActions {
  fetch() {
    networkAction(this, api.films.getAll);
  }
  get(id) {
    networkAction(this, api.films.get, id);
  }
  findByDirectorId(id) {
    networkAction(this, api.films.getAll, {
      conditions: JSON.stringify({
        director: id
      })
    });
  }
  add(data) {
    networkAction(this, api.films.post, clone(data));
  }
  update(id, data) {
    networkAction(this, api.films.put, id, clone(data));
  }
  delete(id) {
    networkAction(this, api.films.delete, id);
  }
}

module.exports = (alt.createActions(FilmsActions));
