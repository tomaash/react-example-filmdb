'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FilmItem from 'components/shared/film-item';

import DirectorsStore from 'stores/directors-store';
import FilmsStore from 'stores/films-store';
import DirectorsActions from 'actions/directors-actions';
import FilmsActions from 'actions/films-actions';

@connectToStores
export default class FilmProfile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static getStores(props) {
    return [
      FilmsStore,
      DirectorsStore
    ];
  }
  static getPropsFromStores(props) {
    const state = {
      film: FilmsStore.getState().currentFilm,
      director: DirectorsStore.getState().currentDirector
    };
    if (state.film && !state.director) {
      DirectorsActions.get.defer(state.film.director);
    }
    return state;
  }
  componentWillMount() {
    const id = this.context.router.getCurrentParams().id;
    FilmsActions.get(id);
    DirectorsActions.removeCurrent();
  }
  render() {
    if (this.props.film === null) {
      return (
        <h2>Loading...</h2>
      );
    }
    else if (this.props.film !== '') {
      return (
        <div className="container">
          <h1>Film Profile</h1>
          <FilmItem film={this.props.film} director={this.props.director}/>
        </div>
      );
    }
    else {
      return (
        <h2>Film not found</h2>
      );
    }
  }
}
