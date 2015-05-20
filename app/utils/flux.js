'use strict';

import Alt from 'alt';
import AltResolver from './alt-resolver.js';

import RequestsActions from 'actions/requests';
import LocaleActions from 'actions/locale';
import UsersActions from 'actions/users';
import CarsActions from 'actions/cars';
import FilmsActions from 'actions/films-actions';
import DirectorsActions from 'actions/directors-actions';
import StatusActions from 'actions/status-actions';

import RequestsStore from 'stores/requests';
import LocaleStore from 'stores/locale';
import UsersStore from 'stores/users';
import CarsStore from 'stores/cars';
import FilmsStore from 'stores/films-store';
import DirectorsStore from 'stores/directors-store';
import StatusStore from 'stores/status-store';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('requests', RequestsActions);
    this.addActions('locale', LocaleActions);
    this.addActions('users', UsersActions);
    this.addActions('cars', CarsActions);
    this.addActions('films', FilmsActions);
    this.addActions('directors', DirectorsActions);
    this.addActions('status', StatusActions);

    // Register Stores
    this.addStore('requests', RequestsStore);
    this.addStore('locale', LocaleStore);
    this.addStore('users', UsersStore);
    this.addStore('cars', CarsStore);
    this.addStore('films', FilmsStore);
    this.addStore('directors', DirectorsStore);
    this.addStore('status', StatusStore);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
