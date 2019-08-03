import createLogger from 'logging'; 
const logger = createLogger('UserRoute');

import * as logger from 'logging';
import * as express from 'express';

import Server from '../../express/server';
import Service from '../../express/service.type';

import Application from '../application';

/**
 * API:
 *  GET - /user: return list of users
 *  GET - /user?username="tsemach@intel.com": return list of users
 */
class UserRoute implements Service {

  constructor() {
    Server.instance.route('/v1/user', this);
  }

  public add(): express.Router {
    let router = express.Router();

    // --------------------------------------------------------------------------
    router.get('/', (req: express.Request, res: express.Response) => {
      if (req.query['username']) {
        logger.info('GET:/v1/user - got username = ', req.query['username'])
        res.json({success: true, data: {message: `user-route: got name - ${req.query['username']}`}});

        return;
      }

      res.json({success: true, data: {message: 'user-route: no username found'}});
    });

    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });
    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    router.post('/', async (req: express.Request, res: express.Response) => {
      const { userName, displayName } = req.body; 
      if (userName) {
        logger.info('POST:/v1/user - got username = ', userName)

        try {  
          const reply = await Application.todos.createNewUser(userName, displayName);
           logger.info('POST:/v1/user - add user, reply:', JSON.stringify(reply, undefined, 2));
           res.json({success: true, data: [reply]});     
        }
        catch (e) {
          logger.error("POST:/v1/user - ERROR:", e, "\n", e.stack);
          res.json({success: false, data: {error: e}});        }        

          return;
      }
      res.json({success: false, data: {message: 'anable to user userName field'}});
    });

    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });
    // --------------------------------------------------------------------------

    return router;
  }

}

export default new UserRoute();