'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FilmItem from 'components/shared/film-item';

@connectToStores
export default class DirectorProfile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  static getStores(props) {
    return [
      props.flux.getStore('directors'),
      props.flux.getStore('films'),
      props.flux.getStore('status')
    ];
  }
  static getPropsFromStores(props) {
    return {
      director: props.flux.getStore('directors').getState().currentDirector,
      films: props.flux.getStore('films').getState().filteredFilms,
      status: props.flux.getStore('status').getState()
    };
  }
  componentWillMount() {
    const id = this.context.router.getCurrentParams().id;
    this.props.flux.getActions('directors').get(id);
    this.props.flux.getActions('films').findByDirectorId(id);
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
