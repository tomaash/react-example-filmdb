import alt from 'utils/alt';
import {assign} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';
import DirectorsActions from 'actions/directors-actions';

class DirectorsStore {
  constructor() {
    this.bindActions(DirectorsActions);
    this.directors = [];
    this.directorsHash = {};
    this.currentDirector = null;
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
  }
  onGet(director) {
    this.currentDirector = director;
  }
  onUpdate(item) {
    assign(findItemById(this.directors, item._id), item);
  }
  onDelete(item) {
    this.directors.splice(findIndexById(this.directors, item._id), 1);
  }
  onRemoveCurrent() {
    this.currentDirector = null;
  }

}

module.exports = (alt.createStore(DirectorsStore));
