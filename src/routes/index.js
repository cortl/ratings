import { Router } from 'express';
import tvRouter from './ratings';
import Axios from 'axios';
import config from 'config';

const routes = () => {
  const routes = Router({});
  routes.get('/', (_req, res) => res.render('index.html'));
  routes.post('/search/:search', async (req, res) => {
    const search = await Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${config.get('API_KEY')}&language=en-US&query=${req.params.search}`)
      .then(res => res.data.results.map(result => ({
        title: result.name,
        id: result.id, description: result.overview,
        poster: result.poster_path
          ? `https://image.tmdb.org/t/p/w92/${result.poster_path}`
          : null
      })))
      .catch(err => {
        console.error(err.message);
        res.status(500).send(err.message);
      });
    res.json(search);
  });
  routes.use('/ratings', tvRouter());
  return routes;
};

export default routes;
