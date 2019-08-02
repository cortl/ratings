import config from 'config';
import Axios from 'axios';

export const getTvDetails = tvId =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(`Error trying to get tv show details for ${tvId} with error ${err.response.status}: ${err.message}`);
            throw err;
        });
        
export const getSeasonDetails = (tvId, seasonNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(`Error trying to get season ${seasonNumber} from TV Show ${tvId} with error ${err.response.status}: ${err.message}`);
            throw err;
        });

export const getEpisodeDetails = (tvId, seasonNumber, episodeNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(`Error trying to get episode ${episodeNumber} from TV Show ${tvId}, Season ${seasonNumber} with error ${err.response.status}: ${err.message}`);
            throw err;
        });