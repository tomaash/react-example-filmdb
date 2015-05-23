'use strict';

import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FilmItem from 'components/shared/film-item';

@connectToStores
export default class FilmProfile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  static getStores(props) {
    return [
      props.flux.getStore('films'),
      props.flux.getStore('directors')
    ];
  }
  static getPropsFromStores(props) {
    return {
      film: props.flux.getStore('films').getState().currentFilm,
      director: props.flux.getStore('directors').getState().currentDirector
    };
  }
  componentWillMount() {
    const id = this.context.router.getCurrentParams().id;
    this.props.flux.getActions('films').get(id);
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
