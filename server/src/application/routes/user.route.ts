import createLogger from 'logging'; 
const logger = createLogger('UserRoute');

import * as logger from 'logging';
import * as express from 'express';

import Server from '../../express/server';
import Service from '../../express/service.type';

/**
 * API:
 *  GET - /user: return list of users
 *  GET - /user?username="tsemach@intel.com": return list of users
 */
class UserRoute implements Service {

  constructor() {
    Server.instance.route('/user', this);
  }

  public add(): express.Router {
    // route: sanity ------------------------------------------------------------
    let router = express.Router();

    router.get('/', (req: express.Request, res: express.Response) => {
      if (req.query['username']) {
        logger.info('GET:/user - got username = ', req.query['username'])
        res.json({success: true, data: {message: `user-route: got name - ${req.query['username']}`}});

        return;
      }

      res.json({success: true, data: {message: 'user-route: no username found'}});
    });

    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });

    return router;
  // --------------------------------------------------------------------------
  }

}

export default new UserRoute();