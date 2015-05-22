'use strict';

import React from 'react';
// import ListenerMixin from 'alt/mixins/ListenerMixin';
// import {IntlMixin} from 'react-intl';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/bootstrap-input';
import {Button} from 'react-bootstrap';
import {clone} from 'lodash';
// if (process.env.BROWSER) {
//   require('styles/cars.scss');
// }

class CarsTable extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    return this.props.CarsActions.fetch();
  }
  foo() {
    // this.carsActions().fetch();
    console.log('foo');
    console.log(this);
  }
  submit(model) {
    const data = clone(model);
    if (this.state.editItem) {
      this.props.CarsActions.update(data, this.state.editItem);
    }
    else {
      this.props.CarsActions.add(data);
    }
    this.refs.carForm.reset();
    this.setState({editItem: null});
  }
  delete(item, index) {
    this.props.CarsActions.delete(item, index);
  }
  edit(item) {
    this.refs.carForm.reset(item);
    this.setState({editItem: item});
  }
  render() {
    return (
      <div className="container-fluid">
        <Button bsStyle="primary" bsSize="large" onClick={this.foo.bind(this)}>Foo</Button>
        <h1>Cars</h1>
        <Formsy.Form ref="carForm" onSubmit={this.submit.bind(this)}>
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
            {this.props.CarsStore.cars.map((car, index) =>
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
}

CarsTable.propTypes = {
  flux: React.PropTypes.object,
  CarsStore: React.PropTypes.object,
  CarsActions: React.PropTypes.object
};

export default CarsTable;
