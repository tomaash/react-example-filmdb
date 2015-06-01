export default {
  findItemById: function(collection, id) {
    return collection.find(x => x._id === id);
  },
  findIndexById: function(collection, id) {
    var index;
    collection.find((x, i) => {
      index = i;
      return x._id === id;
    });
    return index;
  }
};
