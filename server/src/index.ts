import Server from './express/application';
import * as dotenv from 'dotenv';
dotenv.config();

import './express/services';

const port = process.env.PORT || 3000;

Server.instance.listen('localhost', +port);