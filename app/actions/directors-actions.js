'use strict';
import api from 'utils/api';
import {clone} from 'lodash';
import {networkAction} from 'utils/action-utils';

class DirectorsActions {
  fetch() {
    networkAction({
      context: this,
      method: api.directors.getAll
    });
  }
  add(data) {
    networkAction({
      context: this,
      method: api.directors.post,
      data: clone(data)
    });
  }
  update(id, data) {
    networkAction({
      context: this,
      method: api.directors.put,
      id: id,
      data: clone(data)
    });
  }
  delete(id) {
    networkAction({
      context: this,
      method: api.directors.delete,
      id: id
    });
  }
}

export default DirectorsActions;
