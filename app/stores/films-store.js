'use strict';
import {assign} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';

class FilmsStore {
  constructor() {
    this.bindActions(this.alt.getActions('films'));
    this.films = [];
  }
  onAdd(item) {
    this.films.push(item);
  }
  onFetch(films) {
    this.films = films;
  }
  onUpdate(item) {
    assign(findItemById(this.films, item._id), item);
  }
  onDelete(item) {
    this.films.splice(findIndexById(this.films, item._id), 1);
  }
}

export default FilmsStore;
