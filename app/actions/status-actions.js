import alt from 'utils/alt';

class StatusActions {
  constructor() {
    this.generateActions('started', 'done', 'failed', 'retry');
  }
}

module.exports = (alt.createActions(StatusActions));
