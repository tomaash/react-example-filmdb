import {compact} from 'lodash';

export default {
  networkAction: async function(config) {
    const ctx = config.context;
    try {
      ctx.alt.getActions('status').started();
      var args = compact([config.id, config.data]);
      const response = await config.method.apply(ctx, args);
      ctx.dispatch(response().data);
      ctx.alt.getActions('status').done();
    } catch (err) {
      console.error(err);
      ctx.alt.getActions('status').failed({config: err.config, action: ctx.actionDetails});
    }
  }
};
