import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import path from 'path';
import ejs from 'ejs';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('dist'));
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, '../dist'));

app.use('/', indexRouter());

export default app;
