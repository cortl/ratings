import express from 'express';
import { getTvDetails, getSeasonDetails, getEpisodeDetails } from '../services/moviedb';

const getEpisodesByRating = async (req, res) => {
    const tvId = req.params.id;
    const tv = await getShowById(tvId);
    const seasons = tv.seasons.map(season => ({
        id: `season${season.number}`,
        title: `Season ${season.number}`,
        number: season.number,
        labels: season.episodes.map(ep => `"${ep.name}"`),
        data: season.episodes.map(ep => ep.rating)
    }));

    res.render('tv', { title: tv.title, seasons });
};

const getShowById = async (tvId) => {
    const tv = await getTvDetails(tvId);
    console.log(`Retrieved TV show ${tv.name}`);
    const seasons = await Promise.all(
        Array(tv.seasons.length)
            .fill('x')
            .map((_, index) => getSeasonDetails(tvId, index + 1)));

    console.log(`Retrieved all ${seasons.length} seasons`);
    const ratedSeasons = await Promise.all(seasons.map(async (season, index) => {
        const seasonNum = index + 1;
        const episodes = await Promise.all(season.episodes.map((episode, index) => getEpisodeDetails(tvId, seasonNum, index + 1)));

        return {
            number: seasonNum,
            episodes: episodes.map(episodeDetail => ({
                name: season.episodes.find(ep => ep.episode_number === episodeDetail.episode_number).name,
                number: episodeDetail.episode_number,
                rating: episodeDetail.vote_average
            }))
        };
    }));
    console.log(`Retrieved all episodes`);

    return {
        title: tv.name,
        seasons: ratedSeasons
    };
};

const getPickTvShow = (req, res) => {
    res.render('pick');
};

const router = () => {
    const router = express.Router();
    router.get('/:id', getEpisodesByRating);
    router.get('/', getPickTvShow);
    return router;
};

export default router;