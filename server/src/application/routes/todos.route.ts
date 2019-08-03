import createLogger from 'logging'; 
const logger = createLogger('TodosRoute');

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
    let router = express.Router();

    // --------------------------------------------------------------------------
    router.get('/', async (req: express.Request, res: express.Response, next) => {
      const username = req.query['username']
      if (username) {
        logger.info('GET:/v1/todos - got username = ', username);

        const reply = await Application.todos.getToDos(username);
        logger.info("GET:/v1/todos  - ToDos: ", JSON.stringify(reply, undefined, 2));
        res.json({success: true, data: reply});

        return;
      }

      res.json({success: false, data: {message: 'user-route: no username found'}});
    });
    // --------------------------------------------------------------------------
    
    // --------------------------------------------------------------------------
    router.post('/', async (req: express.Request, res: express.Response) => {
      const { body } = req;
      logger.info("POST:/v1/todos - get todo\n" + JSON.stringify(body, undefined, 2));
      try {
        const reply = await Application.todos.addToDo(body);
        logger.info("[POST:/v1/todos] reply = ", JSON.stringify(reply, undefined, 2));
        res.json({success: true, data: reply});
      }
      catch (e) {
        logger.error("POST:/v1/todos/add - ERROR:", e, "\n", e.stack);
        res.json({success: false, data: {error: e}});
      }      
    });
    // --------------------------------------------------------------------------

    // // --------------------------------------------------------------------------
    // router.post('/item', async (req: express.Request, res: express.Response) => {
    //   const { body } = req;
    //   logger.info("POST:/v1/todos/item - get todo\n" + JSON.stringify(body, undefined, 2));
    //   try {
    //     const reply = await Application.todos.addToDoItem(body)
    //     console.log("POST:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
    //     res.json({success: reply.ok === 1, data: reply});
    //   }
    //   catch (e) {
    //     console.log("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
    //     res.json({success: false, data: {error: e}});
    //   }
    // });
    // // --------------------------------------------------------------------------

    // // --------------------------------------------------------------------------
    // router.put('/item', async (req: express.Request, res: express.Response) => {
    //   const { body } = req;
    //   logger.info("PUT:/v1/todos/item - get todo\n" + JSON.stringify(body, undefined, 2));
    //   try {
    //     const reply = await Application.todos.editToDoItem(body)
    //     console.log("PUT:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
    //     res.json({success: reply.ok === 1, data: reply});
    //   }
    //   catch (e) {
    //     console.log("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
    //     res.json({success: false, data: {error: e}});
    //   }
    // });
    // // --------------------------------------------------------------------------

    // // --------------------------------------------------------------------------
    // router.delete('/item', async (req: express.Request, res: express.Response) => {
    //   const { body } = req;
    //   logger.info("DELETE:/v1/todos/item - get todo\n" + JSON.stringify(body, undefined, 2));
    //   try {
    //     const reply = await Application.todos.deleteToDoItem(body)
    //     console.log("DELETE:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
    //     res.json({success: reply.ok === 1, data: reply});
    //   }
    //   catch (e) {
    //     console.log("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
    //     res.json({success: false, data: {error: e}});
    //   }
    // });
    // // --------------------------------------------------------------------------    
    return router;
  }

}

export default new TodosRoute();