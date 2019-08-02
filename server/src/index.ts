import * as dotenv from 'dotenv';
dotenv.config();

import Server from './express';
import * as mongoose from  'mongoose';

import './application/routes';

const uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net?retryWrites=true&w=majority";
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {dbName: 'intel-todo'});
mongoose.connection.once('open', () => {
  console.log('connected to todos database');
});

const port = process.env.PORT || 3000;

Server.instance.listen('localhost', +port);
