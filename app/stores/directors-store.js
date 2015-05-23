'use strict';
import {assign} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';

class DirectorsStore {
  constructor() {
    this.bindActions(this.alt.getActions('directors'));
    this.directors = [];
    this.directorsHash = {};
  }
  onAdd(item) {
    this.directors.push(item);
  }
  onFetch(directors) {
    this.directors = directors;
    this.directorsHash = this.directors.reduce((hash, item) => {
      hash[item._id] = item;
      return hash;
    }, {});
    console.log(this.directorsHash);
  }
  onUpdate(item) {
    assign(findItemById(this.directors, item._id), item);
  }
  onDelete(item) {
    this.directors.splice(findIndexById(this.directors, item._id), 1);
  }
}

export default DirectorsStore;
