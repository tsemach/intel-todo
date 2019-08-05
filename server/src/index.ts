import * as dotenv from 'dotenv';
dotenv.config();

import Server from './express';
import * as mongoose from  'mongoose';

import './application/routes';

const { 
  MONGODB_CONNECTION_MODE = "remote"
} = process.env;

let waiting = 0;
let uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net?retryWrites=true&w=majority";
if (MONGODB_CONNECTION_MODE === 'local') {
  uri = "mongodb://db:27017/intel-todos";  
  waiting = 5000;
}

setTimeout(() => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(uri, {dbName: 'intel-todo'});
  mongoose.connection.once('open', () => {
    console.log('connected to todos database on:', uri);
  });  
}, waiting);

const port = process.env.PORT || 3000;

Server.instance.listen('localhost', +port);
