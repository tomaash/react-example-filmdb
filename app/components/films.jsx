'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/my-own-input';

export default React.createClass({
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
  filmsActions() {
    return this.props.flux.getActions('films');
  },
  getInitialState() {
    return this.filmsStore().getState();
  },
  componentWillMount() {
    return this.filmsActions().fetch();
  },
  componentDidMount() {
    this.listenTo(this.filmsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  submit(model) {
    if (this.state.editItem) {
      this.filmsActions().update(model, this.state.editItem);
    }
    else {
      this.filmsActions().add(model);
    }
    this.refs.filmForm.reset();
    this.setState({editItem: null});
  },
  delete(item, index) {
    this.filmsActions().delete(item, index);
  },
  edit(item) {
    this.refs.filmForm.reset(item);
    this.setState({editItem: item});
  },
  render() {
    return (
      <div className="container-fluid">
        <h1>Films</h1>
        <Formsy.Form ref="filmForm" onSubmit={this.submit}>
          <BootstrapInput name="name" title="Name" type="text"/>
          <BootstrapInput name="director" title="Director" type="text"/>
          <BootstrapInput name="year" title="Year" type="text"/>
          <button className="btn btn-default" type="submit">{this.state.editItem ? 'Update' : 'Create'}</button>
        </Formsy.Form>
        <br/>
        <table className="table table-striped item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Director</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.director}</td>
              <td>{item.year}</td>
              <td>
              <div className="action">
                <span className="action-buttons">
                  <button className='btn btn-xs btn-primary'>Show</button>
                  <button onClick={this.edit.bind(this, item)} className='btn btn-xs btn-warning'>Edit</button>
                  <button onClick={this.delete.bind(this, item, index)} className='btn btn-xs btn-danger'>Delete</button>
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
