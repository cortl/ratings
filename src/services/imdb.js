import axios from 'axios';
import cheerio from 'cheerio';
import { getExternalIds } from './moviedb';

const getTvShowInfo = async (tmdbId) => {
    const externalIds = await getExternalIds(tmdbId);
    const tvId = externalIds.imdb_id;
    const tvShowPage = await axios.get(`https://www.imdb.com/title/${tvId}/`).then(res => res.data);
    const $ = cheerio.load(tvShowPage);

    const title = $('h1').text().trim();
    const description = $('.summary_text').text().trim();

    const seasonNumbers = [];
    $('.seasons-and-year-nav div:nth-child(4) a').each((index, element) => seasonNumbers.push(element.children[0].data));
    return {
        title,
        description,
        seasons: seasonNumbers.reverse()
    };
};

export const getShow = async (tvId) => {
    const tv = await getTvShowInfo(tvId);

    const seasons = await Promise.all(tv.seasons.map(async number => {
        const seasonUrl = `https://www.imdb.com/title/tt0386676/episodes?season=${number}`;
        const page = await axios.get(seasonUrl).then(res => res.data);
        const $ = cheerio.load(page);
        const episodes = [];

        $('.list_item').each((index, element) =>
            episodes.push({
                title: $(element).find('a[itemprop=name]').text(),
                number: index + 1,
                rating: $(element).find('.ipl-rating-star__rating').first().text()
            }));

        return {
            number: parseInt(number),
            episodes
        };

    }));
    return {
        ...tv,
        seasons
    };
};