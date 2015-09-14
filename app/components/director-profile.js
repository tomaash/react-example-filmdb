'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FilmItem from 'components/shared/film-item';

import DirectorsStore from 'stores/directors-store';
import FilmsStore from 'stores/films-store';
import StatusStore from 'stores/directors-store';
import LoginStore from 'stores/login-store';
import DirectorsActions from 'actions/directors-actions';
import FilmsActions from 'actions/films-actions';
import StatusActions from 'actions/status-actions';
import LoginActions from 'actions/login-actions';

@connectToStores
export default class DirectorProfile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  // static propTypes = {
  //   flux: React.PropTypes.object.isRequired
  // }
  static getStores() {
    return [DirectorsStore, FilmsStore, StatusStore];
  }
  static getPropsFromStores() {
    return {
      director: DirectorsStore.getState().currentDirector,
      films: FilmsStore.getState().filteredFilms,
      status: StatusStore.getState()
    };
  }
  componentWillMount() {
    const id = this.context.router.getCurrentParams().id;
    DirectorsActions.get(id);
    FilmsActions.findByDirectorId(id);
  }
  render() {
    if (this.props.director === null) {
      return (
        <h2>Loading...</h2>
      );
    }
    else if (this.props.director !== '') {
      return (
        <div className="container">
          <h1>Director profile</h1>
          <hr/>
          <h1>{this.props.director.name}</h1>
          <h3>Nationality: <b>{this.props.director.nationality}</b></h3>
          <h3>Bio:</h3>
          <p>{this.props.director.biography}</p>
          <h1>Filmography:</h1>
          {this.props.films && this.props.films.map((film, index) =>
            <FilmItem key={index} film={film} inlined={true}/>
          )}
        </div>
      );
    }
    else {
      return (
        <h2>Director not found</h2>
      );
    }
  }
}
