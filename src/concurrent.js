import axios from 'axios';
import rateLimit from 'axios-rate-limit';

export default rateLimit(axios.create(), { maxRequests: 30, perMilliseconds: 1000 * 10 });