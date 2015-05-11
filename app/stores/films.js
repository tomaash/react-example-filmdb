'use strict';
import {assign} from 'lodash';

class FilmsStore {
  constructor() {
    this.bindActions(this.alt.getActions('films'));
    this.items = [];
  }

  onAdd(item) {
    this.items.push(item);
  }

  onFetch(items) {
    this.items = items;
  }

  onUpdate(msg) {
    assign(msg.item, msg.data);
  }

  onDelete(index) {
    this.items.splice(index, 1);
  }
}

export default FilmsStore;
