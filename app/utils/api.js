import restful from 'restful.js';

const api = {};

if (process.env.BROWSER) {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol.replace(':', '');
  const port = window.location.port;
  const server = restful(hostname)
    .prefixUrl('api')
    .protocol(protocol)
    .port(port);

  api.server = server;
  const endpoints = ['cars', 'films', 'directors'];

  endpoints.forEach((endpoint)=> {
    api[endpoint] = server.all(endpoint);
  });

  api.updateToken = function (token) {
    server.header('auth-token', token);
  };
}

export default api;
