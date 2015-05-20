'use strict';

class StatusActions {
  constructor() {
    this.generateActions('started', 'done', 'failed', 'retry');
  }
  // retry() {
  //   console.log('in action');
  //   this.dispatch('foo');
  // }
}

export default StatusActions;
