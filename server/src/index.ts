import * as dotenv from 'dotenv';
dotenv.config();

import Server from './express';
import * as mongoose from  'mongoose';

import './application/routes';

const { 
  MONGODB_CONNECTION_MODE = "remote"
} = process.env;

let uri = "mongodb+srv://tsemach:LgA4VfbH0knDwcPh@center-1-kivdh.mongodb.net?retryWrites=true&w=majority";
if (MONGODB_CONNECTION_MODE === 'local') {
  uri = "mongodb://localhost:27017/intel-todos";  
}

mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {dbName: 'intel-todo'});
mongoose.connection.once('open', () => {
  console.log('connected to todos database on:', uri);
});

const port = process.env.PORT || 3000;

Server.instance.listen('localhost', +port);
