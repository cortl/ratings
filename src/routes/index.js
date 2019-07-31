import { Router } from 'express';
import tvRouter from './ratings';

const routes = () => {
  const routes = Router({});
  routes.get('/', (req, res) => res.render('index.html'));
  routes.use('/ratings', tvRouter());
  return routes;
};

export default routes;
