import alt from 'utils/alt';
import {assign, defer} from 'lodash';
import {findItemById, findIndexById} from 'utils/store-utils';
import FilmsActions from 'actions/films-actions';
import DirectorsActions from 'actions/films-actions';

class FilmsStore {
  constructor() {
    this.bindActions(FilmsActions);
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
    // DirectorsActions.get.defer(film.director);
    // Fetch director for current film
    // defer(DirectorsActions.get.bind(this, film.director));
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

module.exports = (alt.createStore(FilmsStore));

