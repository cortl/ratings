import axios from 'axios';
import cheerio from 'cheerio';
import { getExternalIds } from './moviedb';

const getTvShowInfo = async (tvId) => {
    console.info(`retrieving details for ${tvId}`);
    const tvShowPage = await axios.get(`https://www.imdb.com/title/${tvId}/episodes`).then(res => res.data);
    const $ = cheerio.load(tvShowPage);

    const title = $('h1').text().trim();
    const description = $('.summary_text').text().trim();

    const seasonNumbers = [];
    $('#bySeason').children().each((index, element) => seasonNumbers.push(element.children[0].data.trim()));
    return {
        title,
        description,
        seasons: seasonNumbers.reverse()
    };
};

export const getShow = async (tmdbId) => {
    const externalIds = await getExternalIds(tmdbId);
    console.time(externalIds.imdb_id);
    console.info(`Retrieved external id ${externalIds.imdb_id} for ${tmdbId}`);

    const tvId = externalIds.imdb_id;
    const tv = await getTvShowInfo(tvId);
    console.log(tv);
    const seasons = await Promise.all(tv.seasons.map(async number => {
        const seasonUrl = `https://www.imdb.com/title/${tvId}/episodes?season=${number}`;
        const page = await axios.get(seasonUrl).then(res => res.data);
        const $ = cheerio.load(page);
        const episodes = [];

        $('.list_item').each((index, element) =>
            episodes.push({
                title: $(element).find('a[itemprop=name]').text(),
                number: index + 1,
                rating: $(element).find('.ipl-rating-star__rating').first().text()
            }));

        console.info(`Retrieved season ${number} for ${tvId}`);
        return {
            number: parseInt(number),
            episodes
        };

    }));
    console.info(`Finished gathering data for ${tvId}`);
    console.timeEnd(tvId);
    return {
        ...tv,
        seasons
    };
};