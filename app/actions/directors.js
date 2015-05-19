'use strict';
import api from 'utils/api';

class DirectorsActions {
  async fetch() {
    try {
      console.log('will fetch directors');
      const response = await api.directors.getAll();
      if (response) {
        this.dispatch(response().data);
      }
    } catch (err) {
      console.log(err.stack);
      this.dispatch(err);
    }
  }
  async add(item) {
    const response = await api.directors.post(item);
    this.dispatch(response().data);
  }
  async update(data, item) {
    const response = await api.directors.put(item[api.ID_ATTR], data);
    this.dispatch({data: response().data, item: item});
  }
  async delete(item, index) {
    await api.directors.delete(item[api.ID_ATTR]);
    this.dispatch(index);
  }
}

export default DirectorsActions;
