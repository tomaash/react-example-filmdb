import {compact} from 'lodash';

export default {
  networkAction: async function(config) {
    const ctx = config.context;
    const statusActions = ctx.alt.getActions('status');
    try {
      statusActions.started();
      var args = compact([config.id, config.data]);
      const response = await config.method.apply(ctx, args);
      ctx.dispatch(response().data);
      statusActions.done();
    } catch (err) {
      console.error(err);
      statusActions.failed({config: err.config, action: ctx.actionDetails});
    }
  }
};
