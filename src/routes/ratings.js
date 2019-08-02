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
    console.log(`Retrieved TV show ${tv.name}:${tvId}`);
    const seasons = await Promise.all(tv.seasons.map(season => getSeasonDetails(tvId, season.season_number)));

    console.log(`Retrieved all ${seasons.length} seasons`);
    const ratedSeasons = await Promise.all(seasons.map(async season => {
        const episodes = await Promise.all(season.episodes.map(async episode => {
            console.time(`${season.season_number}-${episode.episode_number}`);
            const epDetails = await getEpisodeDetails(tvId, season.season_number, episode.episode_number);
            console.timeEnd(`${season.season_number}-${episode.episode_number}`);
            return epDetails;
        }));

        console.log('Retrieved episodes from season', season.season_number);
        return {
            number: season.season_number,
            episodes: episodes.map(episodeDetail => ({
                title: season.episodes.find(ep => ep.episode_number === episodeDetail.episode_number).name,
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