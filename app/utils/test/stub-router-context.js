/**
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   var stubRouterContext = require('./stubRouterContext');
 *   var IndividualComponent = require('./IndividualComponent');
 *   var Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

var React = require('react');
var _ = require('lodash');

var func = React.PropTypes.func;

var stubRouterContext = function(Component, props, stubs) {
  return React.createClass({
    childContextTypes: {
      makePath: func,
      makeHref: func,
      transitionTo: func,
      replaceWith: func,
      goBack: func,
      getCurrentPath: func,
      getCurrentRoutes: func,
      getCurrentPathname: func,
      getCurrentParams: func,
      getCurrentQuery: func,
      isActive: func,
    },

    getChildContext: function() {
      return _.merge({}, {
        makePath: function() {},
        makeHref: function() {},
        transitionTo: function() {},
        replaceWith: function() {},
        goBack: function() {},
        getCurrentPath: function() {},
        getCurrentRoutes: function() {},
        getCurrentPathname: function() {},
        getCurrentParams: function() {},
        getCurrentQuery: function() {},
        isActive: function() {},
      }, stubs);
    },

    render: function() {
      return <Component {...props} />
    }
  });
};

module.exports = stubRouterContext