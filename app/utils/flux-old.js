'use strict';

import alt from 'utils/alt';
import AltResolver from './alt-resolver.js';

import CarsActions from 'actions/cars';
import FilmsActions from 'actions/films-actions';
import DirectorsActions from 'actions/directors-actions';
import StatusActions from 'actions/status-actions';
import LoginActions from 'actions/login-actions';

import CarsStore from 'stores/cars';
import FilmsStore from 'stores/films-store';
import DirectorsStore from 'stores/directors-store';
import StatusStore from 'stores/status-store';
import LoginStore from 'stores/login-store';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('cars', CarsActions);
    this.addActions('films', FilmsActions);
    this.addActions('directors', DirectorsActions);
    this.addActions('status', StatusActions);
    this.addActions('login', LoginActions);

    // Register Stores
    this.addStore('cars', CarsStore);
    this.addStore('films', FilmsStore);
    this.addStore('directors', DirectorsStore);
    this.addStore('status', StatusStore);
    this.addStore('login', LoginStore);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
