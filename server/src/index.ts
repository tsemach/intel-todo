import Server from './express';
import * as dotenv from 'dotenv';
dotenv.config();

import './application/routes';

const port = process.env.PORT || 3000;

Server.instance.listen('localhost', +port);