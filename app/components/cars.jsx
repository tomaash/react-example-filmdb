'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import Formsy from 'formsy-react';
import MyOwnInput from 'components/shared/my-own-input';

// if (process.env.BROWSER) {
//   require('styles/cars.scss');
// }

export default React.createClass({
  displayName: 'Cars',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  carsStore() {
    return this.props.flux.getStore('cars');
  },
  carsActions() {
    return this.props.flux.getActions('cars');
  },
  getInitialState() {
    return this.carsStore().getState();
  },
  componentWillMount() {
    return this.carsActions().fetch();
  },
  componentDidMount() {
    this.listenTo(this.carsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  submit(model) {
    if (this.state.editItem) {
      this.carsActions().update(model, this.state.editItem);
    }
    else {
      this.carsActions().add(model);
    }
    this.refs.carForm.reset();
    this.setState({editItem: null});
  },
  delete(item, index) {
    this.carsActions().delete(item, index);
  },
  edit(item) {
    this.refs.carForm.reset(item);
    this.setState({editItem: item});
  },
  render() {
    return (
      <div className="container-fluid">
        <h1>Cars</h1>
        <Formsy.Form ref="carForm" onSubmit={this.submit}>
          <MyOwnInput name="brand" title="Brand" type="text"/>
          <MyOwnInput name="model" title="Model" type="text"/>
          <MyOwnInput name="year" title="Year" type="text"/>
          <button className="btn btn-default" type="submit">{this.state.editItem ? 'Update' : 'Create'}</button>
        </Formsy.Form>
        <br/>
        <table className="table table-striped car-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cars.map((car, index) =>
            <tr key={index}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>
              <div className="action">
                <span className="action-buttons">
                  <button ng-click="vm.show(item)" className='btn btn-xs btn-primary'>Show</button>
                  <button onClick={this.edit.bind(this, car)} className='btn btn-xs btn-warning'>Edit</button>
                  <button onClick={this.delete.bind(this, car, index)} className='btn btn-xs btn-danger'>Delete</button>
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
