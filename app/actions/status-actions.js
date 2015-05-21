'use strict';

class StatusActions {
  constructor() {
    this.generateActions('started', 'done', 'failed', 'retry');
  }
}

export default StatusActions;
