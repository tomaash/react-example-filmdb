'use strict';
import {assign} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';

class DirectorsStore {
  constructor() {
    this.bindActions(this.alt.getActions('directors'));
    this.directors = [];
  }
  onAdd(item) {
    this.directors.push(item);
  }
  onFetch(directors) {
    this.directors = directors;
  }
  onUpdate(item) {
    assign(findItemById(this.directors, item._id), item);
  }
  onDelete(item) {
    this.directors.splice(findIndexById(this.directors, item._id), 1);
  }
}

export default DirectorsStore;
