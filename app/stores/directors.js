'use strict';
import {assign} from 'lodash';

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

  onUpdate(msg) {
    assign(msg.item, msg.data);
  }

  onDelete(index) {
    this.directors.splice(index, 1);
  }
}

export default DirectorsStore;
