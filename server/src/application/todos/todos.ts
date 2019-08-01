import createLogger from 'logging'; 
const logger = createLogger('ToDos');

import ToDosModel from '../models/intel-todos';

class ToDos {
  constructor() {
  }

  getToDos(username: string) {
    logger.info('goinf to get todos for username:',  username);

    return ToDosModel.find({username});
  }
}

export default ToDos;