'use strict';
import api from 'utils/api';
import {clone} from 'lodash';
import {networkAction} from 'utils/action-utils';

class FilmsActions {
  fetch() {
    networkAction({
      context: this,
      method: api.films.getAll
    });
  }
  add(item) {
    var saveItem = clone(item);
    networkAction({
      context: this,
      method: api.films.post,
      data: saveItem
    });
  }
  update(id, data) {
    networkAction({
      context: this,
      method: api.films.put,
      id: id,
      data: data
    });
  }
  delete(id) {
    networkAction({
      context: this,
      method: api.films.delete,
      id: id
    });
  }
}

export default FilmsActions;
