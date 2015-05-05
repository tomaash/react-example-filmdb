'use strict';
import {assign} from 'lodash';

class CarsStore {
  constructor() {
    this.bindActions(this.alt.getActions('cars'));
    this.cars = ['kukabus'];
  }

  onAdd(car) {
    console.log('adding ' + car.brand);
  }

  onAddSuccess(car) {
    console.log('added ' + car.brand);
    this.cars.push(car);
  }

  onFetchSuccess(cars) {
    this.cars = cars;
  }

  onUpdateSuccess(msg) {
    assign(msg.item, msg.data);
  }

  onDeleteSuccess(index) {
    this.cars.splice(index, 1);
  }

}

export default CarsStore;
