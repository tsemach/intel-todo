import createLogger from 'logging'; 
const logger = createLogger('SanityRoute');

import * as logger from 'logging';
import * as express from 'express';

import Server from '../../express/server';
import Service from '../../express/service.type';

import Application from '../application';

class TodosRoute implements Service {

  constructor() {
    Server.instance.route('/v1/todos', this);
  }

  public add(): express.Router {
    // route: sanity ------------------------------------------------------------
    let router = express.Router();

    router.get('/', async (req: express.Request, res: express.Response, next) => {
      const username = req.query['username']
      if (username) {
        logger.info('GET:/v1/todos - got username = ', username)
        
        const reply = await Application.todos.getToDos(username);
        logger.info("ToDos: ", JSON.stringify(reply, undefined, 2));
        res.json({success: true, data: reply});

        return;
      }

      res.json({success: false, data: {message: 'user-route: no username found'}});
    });


    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });

    return router;
  // --------------------------------------------------------------------------
  }

}

export default new TodosRoute();