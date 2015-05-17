'use strict';
import api from 'utils/api';

class FilmsActions {
  async fetch() {
    try {
      console.log('will fetch films');
      const response = await api.films.getAll();
      if (response) {
        this.dispatch(response().data);
      }
      // else {
      //   throw new Error('server error');
      // }
    } catch (err) {
      console.log(err.stack);
      this.dispatch(err);
    }
  }
  async add(item) {
    // api.films.post();
    console.log(item);
    const response = await api.films.post(item);
    this.dispatch(response().data);
  }
  async update(data, item) {
    const response = await api.films.put(item[api.ID_ATTR], data);
    this.dispatch({data: response().data, item: item});
  }
  async delete(item, index) {
    await api.films.delete(item[api.ID_ATTR]);
    this.dispatch(index);
  }
}

export default FilmsActions;
