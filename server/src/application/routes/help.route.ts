import createLogger from 'logging'; 
const logger = createLogger('SanityRoute');

import * as logger from 'logging';
import * as express from 'express';

import Server from '../../express/server';
import Service from '../../express/service.type';

class SanityRoute implements Service {

  constructor() {
    Server.instance.route('/help', this);
  }

  public add(): express.Router {
    // route: sanity ------------------------------------------------------------
    let router = express.Router();

    router.get('/', (_, res, __) => {
      res.send(`
-----------------------------------------------------------------------------------
description: getting all todos
method: GET: /v1/todos
example: curl http://localhost:3000/v1/todos
-----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------
description: add todo to user
method: GET: /v1/todos/add
example: curl -X POST http://localhost:3000/v1/todos/add -H "Content-Type: application/json" -d '{"_id": "5d433466cc2fd3121814e97e", "title": "add new todo"}'
-----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------
description: add todo to user
method: GET: /v1/todos/item/add
example: curl -X POST http://localhost:3000/v1/todos/item/add -H "Content-Type: application/json" -d '{"_id": "5d442511e0d2af1169b334a5", "header": "add new item", "isCompleted": "false"}'
-----------------------------------------------------------------------------------
`
      );
    });

    router.get('/todo', (req: express.Request, res: express.Response) => {      
      res.json({success: true, data: {message: 'sanity-route: todo is up'}});
    });

    return router;
  // --------------------------------------------------------------------------
  }

}

export default new SanityRoute();