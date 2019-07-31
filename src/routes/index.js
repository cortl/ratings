import { Router } from 'express';
import tvRouter from './ratings';

const pickShow = (req, res) => {
  res.render('pick');
};

const search = (req, res) => {
  console.log(req.params);
  res.render('search');
};

const routes = () => {
  const routes = Router({});
  routes.get('/', pickShow);
  routes.post('/search', search);
  routes.use('/ratings', tvRouter());
  return routes;
};

export default routes;
