'use strict';
const ID_ATTR = '_id';
class CarsActions {
  constructor() {
    this.generateActions(
      'addSuccess', 'fetchSuccess', 'updateSuccess', 'deleteSuccess'
    );
  }
  async fetch() {
    const response = await this.alt.api.all('cars').getAll();
    this.actions.fetchSuccess(response().data);
  }
  async add(car) {
    this.dispatch(car);
    const response = await this.alt.api.all('cars').post(car);
    this.actions.addSuccess(response().data);
  }
  async update(data, item) {
    const response = await this.alt.api.all('cars').put(item[ID_ATTR], data);
    this.actions.updateSuccess({data: response().data, item: item});
  }
  async delete(car, index) {
    await this.alt.api.all('cars').delete(car[ID_ATTR]);
    this.actions.deleteSuccess(index);
  }
}

export default CarsActions;
