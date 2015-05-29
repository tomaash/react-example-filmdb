'use strict';
import axios from 'axios';
// import {defer} from 'lodash';

export default class StatusStore {
  constructor() {
    this.bindActions(this.alt.getActions('status'));
    this.busy = false;
    this.error = false;
  }
  onStarted() {
    this.busy = true;
    this.error = false;
  }
  onDone() {
    this.busy = false;
    this.error = false;
  }
  onFailed(retryData) {
    this.busy = false;
    this.error = true;
    this.retryData = retryData;
  }
  async onRetry() {
    const response = await axios(this.retryData.config);
    var data = response.data;
    this.alt.dispatch(this.retryData.action.symbol, data, this.retryData.action);
    this.alt.getActions('status').done();
  }

}
