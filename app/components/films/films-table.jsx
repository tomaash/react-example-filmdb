'use strict';

import React from 'react';
import FilmForm from './film-form';
import {ModalTrigger, Button} from 'react-bootstrap';

export default class FilmsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object,
    FilmsActions: React.PropTypes.object,
    DirectorsActions: React.PropTypes.object,
    FilmsStore: React.PropTypes.object,
    DirectorsStore: React.PropTypes.object
  }
  componentWillMount() {
    this.props.FilmsActions.fetch();
    this.props.DirectorsActions.fetch();
  }
  directorName(id) {
    const data = this.props.DirectorsStore.directorsHash[id];
    return data && data.name;
  }
  delete(item) {
    this.props.FilmsActions.delete(item._id);
  }
  edit(item) {
    this.setState({
      editItem: item
    });
    this.refs.modalTrigger.show();
  }
  add() {
    this.setState({
      editItem: null
    });
    this.refs.modalTrigger.show();
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Films</h1>
        <ModalTrigger ref="modalTrigger" modal={<FilmForm flux={this.props.flux} editItem={this.state.editItem} directors={this.props.DirectorsStore.directors}/>}><span/>
        </ModalTrigger>
        <Button bsStyle="primary" bsSize="large" onClick={this.add.bind(this)}>Add new film</Button>
        <br/>
        <table className="table table-striped item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Director</th>
              <th>Year</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.FilmsStore.films && this.props.FilmsStore.films.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{this.directorName(item.director)}</td>
              <td>{item.year}</td>
              <td className="ellipsis">{item.description}</td>
              <td>
              <div className="action">
                <span className="action-buttons">
                  <button className='btn btn-xs btn-primary'>Show</button>
                  <button onClick={this.edit.bind(this, item)} className='btn btn-xs btn-warning'>Edit</button>
                  <button onClick={this.delete.bind(this, item)} className='btn btn-xs btn-danger'>Delete</button>
                </span>
              </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

