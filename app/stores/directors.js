'use strict';
import {assign} from 'lodash';

class DirectorsStore {
  constructor() {
    this.bindActions(this.alt.getActions('directors'));
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

export default DirectorsStore;
