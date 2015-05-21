'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
// import Formsy from 'formsy-react';
// import BootstrapInput from 'components/shared/bootstrap-input';
import FormModal from './form-modal';
import {
  ModalTrigger, Button
}
from 'react-bootstrap';

export
default React.createClass({
  displayName: 'Films',
  mixins: [ListenerMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  filmsStore() {
    return this.props.flux.getStore('films');
  },
  directorsStore() {
    return this.props.flux.getStore('directors');
  },
  filmsActions() {
    return this.props.flux.getActions('films');
  },
  directorsActions() {
    return this.props.flux.getActions('directors');
  },
  getInitialState() {
    var directors = this.directorsStore().getState().directors;
    var directorsHash = {};
    if (directors) {
      directors = directors && directors.map((x) => {
        directorsHash[x._id] = x;
        return {
          label: x.name,
          value: x._id
        };
      });
    }
    return {
      films: this.filmsStore().getState().films,
      directors: directors,
      directorsHash: directorsHash
    };
  },
  directorName(id) {
    const data = this.state.directorsHash[id];
    return data && data.name;
  },
  componentWillMount() {
    this.directorsActions().fetch();
    this.filmsActions().fetch();
  },
  componentDidMount() {
    this.listenTo(this.filmsStore(), this.handleStoreChange);
    this.listenTo(this.directorsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  delete(item) {
    this.filmsActions().delete(item._id);
  },
  edit(item) {
    this.setState({
      editItem: item
    });
    this.refs.modalTrigger.show();
  },
  add() {
    this.setState({
      editItem: null
    });
    this.refs.modalTrigger.show();
  },
  render() {
    return (
      <div className="container-fluid">
        <h1>Films</h1>
        <ModalTrigger ref="modalTrigger" modal={<FormModal flux={this.props.flux} editItem={this.state.editItem} directors={this.state.directors}/>}><span/>
        </ModalTrigger>
        <Button bsStyle="primary" bsSize="large" onClick={this.add}>Add new film</Button>
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
            {this.state.films && this.state.films.map((item, index) =>
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
});

