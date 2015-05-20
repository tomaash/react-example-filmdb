'use strict';
import api from 'utils/api';
import {clone} from 'lodash';

class DirectorsActions {
  async fetch() {
    try {
      this.alt.getActions('status').started();
      const response = await api.directors.getAll();
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
      const response = await api.directors.post(saveItem);
      this.dispatch(response().data);
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed({config: err.config, action: this.actionDetails});
    }
  }
  async update(data, item) {
    try {
      this.alt.getActions('status').started();
      const response = await api.directors.put(item._id, data);
      this.dispatch({data: response().data, item: item});
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed();
    }
  }
  async delete(item, index) {
    try {
      this.alt.getActions('status').started();
      await api.directors.delete(item._id);
      this.dispatch(index);
      this.alt.getActions('status').done();
    } catch (err) {
      this.alt.getActions('status').failed();
    }
  }
}

export default DirectorsActions;
