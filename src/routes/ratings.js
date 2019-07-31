import express from 'express';
import { getTvDetails, getSeasonDetails, getEpisodeDetails } from '../services/moviedb';

const getEpisodesByRating = (req, res) => {
    const tvId = req.params.id;
    getShowById(tvId)
    .then(tv => res.status(200).json({ title: tv.title, seasons: tv.seasons }))
    .catch(err => res.status(500).send(err.message));
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


const router = () => {
    const router = express.Router();
    router.get('/:id', getEpisodesByRating);
    return router;
};

export default router;