import alt from 'utils/alt';
import axios from 'axios';
import StatusActions from 'actions/status-actions';

class StatusStore {
  constructor() {
    this.bindActions(StatusActions);
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
    alt.dispatch(this.retryData.action.symbol, data, this.retryData.action);
    StatusActions.done();
  }
}

module.exports = (alt.createStore(StatusStore));

