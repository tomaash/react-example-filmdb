import Router from 'react-router';
import routes from 'routes';

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

export default router;
