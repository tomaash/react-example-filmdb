// import {isFunction} from 'lodash';
import StatusActions from 'actions/status-actions';

export default {
  networkAction: async function(context, method, ...params) {
    // try {
      StatusActions.started();
      const response = await method.apply(context, params);
      // const data = isFunction(response) ? response().data : response.data;
      context.dispatch(response().data);
      StatusActions.done();
    // } catch (err) {
    //   console.error(err);
    //   StatusActions.failed({config: err.config, action: context.actionDetails});
    // }
  }
};
