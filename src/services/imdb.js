import axios from 'axios';
import cheerio from 'cheerio';
import { getExternalIds, getTvDetails } from './moviedb';

const getTvShowInfo = async (imdbId, tmdbId) => {
    console.info(`retrieving details for ${imdbId}`);
    const { name, overview} = await getTvDetails(tmdbId);
    const tvShowPage = await axios.get(`https://www.imdb.com/title/${imdbId}/episodes`).then(res => res.data);
    const $ = cheerio.load(tvShowPage);

    const seasonNumbers = [];
    $('#bySeason').children().each((index, element) => seasonNumbers.push(element.children[0].data.trim()));
    return {
        title: name,
        description: overview,
        seasons: seasonNumbers.reverse()
    };
};

export const getShow = async (tmdbId) => {
    const externalIds = await getExternalIds(tmdbId);
    console.time(externalIds.imdb_id);
    console.info(`Retrieved external id ${externalIds.imdb_id} for ${tmdbId}`);

    const imdbId = externalIds.imdb_id;
    const tv = await getTvShowInfo(imdbId, tmdbId);
    const seasons = await Promise.all(tv.seasons.map(async number => {
        const seasonUrl = `https://www.imdb.com/title/${imdbId}/episodes?season=${number}`;
        const page = await axios.get(seasonUrl).then(res => res.data);
        const $ = cheerio.load(page);
        const episodes = [];

        $('.list_item').each((index, element) =>
            episodes.push({
                title: $(element).find('a[itemprop=name]').text(),
                number: index + 1,
                rating: $(element).find('.ipl-rating-star__rating').first().text()
            }));

        console.info(`Retrieved season ${number} for ${imdbId}`);
        return {
            number: parseInt(number),
            episodes
        };

    }));
    console.info(`Finished gathering data for ${imdbId}`);
    console.timeEnd(imdbId);
    return {
        ...tv,
        seasons
    };
};