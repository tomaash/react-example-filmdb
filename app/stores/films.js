'use strict';
import {assign} from 'lodash';

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

  onUpdate(msg) {
    assign(msg.item, msg.data);
  }

  onDelete(index) {
    this.films.splice(index, 1);
  }
}

export default FilmsStore;
