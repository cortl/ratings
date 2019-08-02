import express from 'express';
import { getTvDetails, getSeasonDetails, getEpisodeDetails } from '../services/moviedb';

const getEpisodesByRating = (req, res) => {
    const tvId = req.params.id;
    getShowById(tvId)
        .then(tv => res.status(200).json({ title: tv.title, seasons: tv.seasons }))
        .catch(err => res.status(500).send(err.message));
};

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const getShowById = async (tvId) => {
    const tv = await getTvDetails(tvId);
    console.log(`Retrieved TV show ${tv.name}`);
    const seasons = await Promise.all(tv.seasons.map(season => getSeasonDetails(tvId, season.season_number)));

    console.log(`Retrieved all ${seasons.length} seasons`);
    const ratedSeasons = [];
    for (const season of seasons) {
        const episodes = [];
        for (const episode of season.episodes) {
            console.time(`${season.season_number}-${episode.episode_number}`);
            episodes.push(await timeout(100).then(() => {
                console.timeEnd(`${season.season_number}-${episode.episode_number}`);
                return getEpisodeDetails(tvId, season.season_number, episode.episode_number);
            }));
        }
        console.log('Retrieved episodes from season', season.season_number);
        await timeout(1000);
        ratedSeasons.push({
            number: season.season_number,
            episodes: episodes.map(episodeDetail => ({
                name: season.episodes.find(ep => ep.episode_number === episodeDetail.episode_number).name,
                number: episodeDetail.episode_number,
                rating: episodeDetail.vote_average
            }))
        });
    }
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