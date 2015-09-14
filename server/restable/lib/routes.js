var generateRoutes;
var pluralize = require('pluralize');
var koaRouter = require('koa-router');
var _ = require('lodash');

    // bodyParser = require('koa-body-parser');

module.exports = generateRoutes = function(app, model, actions, prefix) {
  if (prefix == null) {
    prefix = '';
  }

  const modelName = pluralize(model.modelName);

  const collectionPrefix = prefix + ("/" + modelName);
  const itemPrefix = prefix + ("/" + modelName + "/:id");


  // app.use(bodyParser());
  var router = koaRouter();

  router.queryInterceptor = function(cb) {
    router.use(function*(next){
      if (this.request.method === "GET") {
        this.request.query = cb(this, this.request.query)
        console.log("query interceptor query:");
        console.log(this.request.query);
      }
      yield next;
    })
  }

  router.conditionsInterceptor = function(cb) {
    router.use(function*(next){
      if (this.request.method === "GET") {
        var conditions;
        var query = _.clone(this.request.query);
        try {
          conditions = (query.conditions && JSON.parse(query.conditions)) || {};
        } catch (err) {
          console.error(err);
          conditions = {};
        }

        conditions = cb(this, conditions)

        query.conditions = JSON.stringify(conditions);
        this.request.query = query;
        console.log("conditions interceptor query:");
        console.log(this.request.query);
      }
      yield next;
    })
  }

  router.collectionHandler = function(method, name, cb) {
    router[method](collectionPrefix + "/" + name, cb);
  }

  router.itemHandler = function(method, name, cb) {
    router[method](itemPrefix + "/" + name, cb);
  }

  router.mount = function() {
    console.log('methods:');
    console.log(model.schema.methods);

    // Mount schema methods
    _.keys(model.schema.methods).forEach(function(method){
      //TODO: All schema methods are bound to get http verb. Do we need to be able to override this?
      router.itemHandler("get", method, function*(next){
        yield next;
        var item = yield model.findById(this.params.id).exec();
        var result = item[method](this.request.query);
        //TODO: This way, 2 database calls are made. Is it possible to optimize?
        this.body = yield result;///item;
      });
    });

    // Mount static methods
    _.keys(model.schema.statics).forEach(function(method){
      //TODO: All schema methods are bound to get http verb. Do we need to be able to override this?
      router.collectionHandler("get", method, function*(next){
        yield next;
        var result = model[method](this.request.query);
        this.body = yield result;///item;
      });
    });

    router.get(collectionPrefix, actions.findAll);
    router.get(itemPrefix, actions.findById);
    router.post(collectionPrefix, actions.create);
    router.post(itemPrefix, actions.updateById);
    router.del(itemPrefix, actions.deleteById);
    router.put(collectionPrefix, actions.create);
    router.put(itemPrefix, actions.replaceById);
    router.patch(itemPrefix, actions.updateById);
    app
     .use(router.routes())
     .use(router.allowedMethods());
  }

  return router;
};