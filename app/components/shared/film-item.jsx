import React from 'react';

export default class FilmItem extends React.Component {
  static propTypes = {
    film: React.PropTypes.object,
    director: React.PropTypes.object
  }
  render() {
    var director;
    if (this.props.director) {
      director = <h3>Director: {this.props.director.name}</h3>;
    }
    const film = this.props.film;
    return (
      <div>
        <hr/>
        <h2>{film && film.name}</h2>
        {director}
        <h3>
          Year: <b>{film && film.year}</b>
        </h3>
        <h3>Storyline:</h3>
        <p>{film && film.description}</p>
      </div>
    );
  }
}
