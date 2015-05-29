export default {
  changeHandler: function(target) {
    target.prototype.changeHandler = function(key, attr, event) {
      var state = {};
      state[key] = this.state[key] || {};
      state[key][attr] = event.currentTarget.value;
      this.setState(state);
    };
    return target;
  }
};
