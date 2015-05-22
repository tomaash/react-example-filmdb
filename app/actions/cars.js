'use strict';
import api from 'utils/api';

class CarsActions {
  constructor() {
    this.generateActions(
      'addSuccess', 'fetchSuccess', 'updateSuccess', 'deleteSuccess'
    );
  }
  async fetch() {
    try {
      console.log('will fetch');
      const response = await api.cars.getAll();
      if (response) {
        this.actions.fetchSuccess(response().data);
      }
    } catch (err) {
      console.log(err.stack);
    }
  }
  async add(car) {
    this.dispatch(car);
    const response = await api.cars.post(car);
    this.actions.addSuccess(response().data);
  }
  async update(data, item) {
    const response = await api.cars.put(item._id, data);
    this.actions.updateSuccess({data: response().data, item: item});
  }
  async delete(car, index) {
    await api.cars.delete(car._id);
    this.actions.deleteSuccess(index);
  }
}

export default CarsActions;
