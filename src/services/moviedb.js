import config from 'config';
import Axios from 'axios';

export const getTvDetails = tvId =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data);

export const getSeasonDetails = (tvId, seasonNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data);

export const getEpisodeDetails = (tvId, seasonNumber, episodeNumber) =>
    Axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${config.get('API_KEY')}&language=en-US`)
        .then(res => res.data);