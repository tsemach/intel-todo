import createLogger from 'logging'; 
const logger = createLogger('SanityRoute');

import * as logger from 'logging';
import * as express from 'express';

import Server from '../../express/server';
import Service from '../../express/service.type';

class SanityRoute implements Service {

  constructor() {
    Server.instance.route('/sanity', this);
  }

  public add(): express.Router {
    // route: sanity ------------------------------------------------------------
    let router = express.Router();

    router.get('/', (_, res, __) => {
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });

    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });

    return router;
  // --------------------------------------------------------------------------
  }

}

export default new SanityRoute();