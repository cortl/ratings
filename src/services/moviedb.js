import config from 'config';
import Axios from 'axios';

// Axios.interceptors.request.use(request => {
//     console.log('Starting Request', request.url);
//     return request;
// });

// Axios.interceptors.response.use(response => {
//     console.log('Response:', response);
//     return response;
// });

export const getTvDetails = tvId =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data);
        
export const getSeasonDetails = (tvId, seasonNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(`Error trying to get season ${seasonNumber} from TV Show ${tvId}`);
            console.error(err.message);
            throw err;
        });

export const getEpisodeDetails = (tvId, seasonNumber, episodeNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data)
        .catch(err => {
            console.log(`Error trying to get episode ${episodeNumber} from TV Show ${tvId}, Season ${seasonNumber}`);
            console.error(err.message);
            throw err;
        });