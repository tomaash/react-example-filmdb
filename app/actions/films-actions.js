'use strict';
import api from 'utils/api';
import {clone} from 'lodash';

class FilmsActions {
  async fetch() {
    try {
      this.alt.getActions('status').started();
      const response = await api.films.getAll();
      this.dispatch(response().data);
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed({config: err.config, action: this.actionDetails});
    }
  }
  async add(item) {
    var saveItem = clone(item);
    try {
      this.alt.getActions('status').started();
      const response = await api.films.post(saveItem);
      this.dispatch(response().data);
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed({config: err.config, action: this.actionDetails});
    }
  }
  async update(data, item) {
    try {
      this.alt.getActions('status').started();
      const response = await api.films.put(item._id, data);
      this.dispatch({data: response().data, item: item});
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed();
    }
  }
  async delete(item, index) {
    try {
      this.alt.getActions('status').started();
      await api.films.delete(item._id);
      this.dispatch(index);
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed();
    }
  }
}

export default FilmsActions;
