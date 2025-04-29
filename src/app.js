import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {AuthRouter} from './auth/route.js';
import {UserRouter} from './users/route.js';
import {AlbumRouter} from './albums/route.js';
import {MerchandiseRouter} from './merchandises/route.js';
import {FollowRouter} from './follows/route.js';
import {PostRouter} from './posts/route.js';
import {PreferencesRouter} from './preferences/route.js';
import { SongRouter } from './songs/route.js';
import { DownloadRoter } from './downloads/route.js';
import {PurchaseRouter} from './purchases/route.js'
import {SizeRouter} from './sizes/route.js';
import {errorHandler} from './utils/errorHandler.js';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// for cookies
app.use(cookieParser());

// log requests
app.use(morgan("dev"));



// Routes
app.get('/', (req, res) => {
  res.send('Hello from music app server!');
});
app.get('/success', (req, res) => {
  res.send('Payment Successfully Completed!');
});
app.get('/cancel', (req, res) => {
  res.send('Payment Failed!');
});

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/albums', AlbumRouter);
app.use('/api/v1/merchandises', MerchandiseRouter);
app.use('/api/v1/follows', FollowRouter);
app.use('/api/v1/posts', PostRouter);
app.use('/api/v1/preferences', PreferencesRouter);
app.use('/api/v1/songs', SongRouter);
app.use('/api/v1/purchases', PurchaseRouter);
app.use('/api/v1/downloads', DownloadRoter);
app.use('/api/v1/sizes', SizeRouter);


// Error handling global middleware
app.use(errorHandler);

export { app };