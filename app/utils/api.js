import restful from 'restful.js';

const create = restful().fullUrl('/api');
const api = {};
const noop = function() {
  return Promise.resolve(null);
};

api.ID_ATTR = '_id';
api.create = create;
api.cars = create.all('cars');
api.films = create.all('films');

if (!process.env.BROWSER) {
  api.cars.getAll = noop;
  api.films.getAll = noop;
}

export default api;
