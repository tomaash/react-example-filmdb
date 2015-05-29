'use strict';
import {assign} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';

export default class FilmsStore {
  constructor() {
    this.bindActions(this.alt.getActions('films'));
    this.films = [];
    this.currentFilm = null;
    this.filteredFilms = [];
  }
  onAdd(item) {
    this.films.push(item);
  }
  onFetch(films) {
    this.films = films;
  }
  onGet(film) {
    this.currentFilm = film;
    // Fetch director for current film
    this.alt.getActions('directors').get.defer(film.director);
  }
  onFindByDirectorId(films) {
    this.filteredFilms = films;
  }
  onUpdate(item) {
    assign(findItemById(this.films, item._id), item);
  }
  onDelete(item) {
    this.films.splice(findIndexById(this.films, item._id), 1);
  }
}
