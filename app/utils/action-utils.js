// import {isFunction} from 'lodash';

export default {
  networkAction: async function(context, method, ...params) {
    const statusActions = context.alt.getActions('status');
    try {
      statusActions.started();
      const response = await method.apply(context, params);
      // const data = isFunction(response) ? response().data : response.data;
      context.dispatch(response().data);
      statusActions.done();
    } catch (err) {
      console.error(err);
      statusActions.failed({config: err.config, action: context.actionDetails});
    }
  }
};
