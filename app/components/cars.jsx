'use strict';

import React from 'react';
// import ListenerMixin from 'alt/mixins/ListenerMixin';
// import {IntlMixin} from 'react-intl';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/bootstrap-input';
import AltContainer from 'alt/AltContainer';
import {Button} from 'react-bootstrap';
// if (process.env.BROWSER) {
//   require('styles/cars.scss');
// }

export default React.createClass({
  displayName: 'Cars',
  // mixins: [ListenerMixin, IntlMixin],
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
    console.log('get init state');
    return this.carsStore().getState();
  },
  componentWillMount() {
    return this.carsActions().fetch();
  },
  componentDidMount() {
    this.handleStoreChange();
    // this.listenTo(this.carsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  foo() {
    this.carsActions().fetch();
    console.log('foo');
    console.log(this.props);
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

  // var _this = this;
  // stores={[this.carsStore()]}
  // inject={{
  //   cars: function (props) {
  //     console.log('inject');
  //     console.log(props);
  //     var cars = _this.props.flux.getStore('cars').getState().cars;
  //     console.log(cars);
  //     return cars;
  //   }
  // }}

  render() {

    return (
      <AltContainer flux={this.props.flux} store={this.carsStore()}>
      <Button bsStyle="primary" bsSize="large" onClick={this.foo.bind(this, this.props)}>Foo</Button>
      <div className="container-fluid">
        <h1>Cars</h1>
        <Formsy.Form ref="carForm" onSubmit={this.submit}>
          <BootstrapInput name="brand" title="Brand" type="text"/>
          <BootstrapInput name="model" title="Model" type="text"/>
          <BootstrapInput name="year" title="Year" type="text"/>
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
      </AltContainer>
    );
  }
});
