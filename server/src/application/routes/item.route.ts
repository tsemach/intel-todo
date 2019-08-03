import createLogger from 'logging'; 
const logger = createLogger('ItemRoute');

import * as logger from 'logging';
import * as express from 'express';

import * as utils from '../../utils/utils';
import Server from '../../express/server';
import Service from '../../express/service.type';

import Application from '../application';
import { ToDoDeleteType } from '../commond/todos.type';

class ItemRoute implements Service {

  constructor() {
    Server.instance.route('/v1/todos/item', this);
  }

  public add(): express.Router {    
    let router = express.Router();

    // --------------------------------------------------------------------------
    router.post('/', async (req: express.Request, res: express.Response) => {
      const { body } = req;
      logger.info("POST:/v1/todos/item - get todo\n" + JSON.stringify(body, undefined, 2));
      try {
        const reply = await Application.todos.addToDoItem(body)        
        logger.info("POST:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
        res.json({success: true, data: [reply]});
      }
      catch (e) {
        logger.error("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
        res.json({success: false, data: {error: e}});
      }
    });
    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    router.put('/', async (req: express.Request, res: express.Response) => {
      const { body } = req;
      logger.info("PUT:/v1/todos/item - get todo\n" + JSON.stringify(body, undefined, 2));
      try {
        const reply = await Application.todos.editToDoItem(body)        
        logger.info("PUT:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
        res.json({success: reply.ok === 1, data: reply});
      }
      catch (e) {
        logger.error("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
        res.json({success: false, data: {error: e}});
      }
    });
    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    router.delete('/', async (req: express.Request, res: express.Response) => {      
      const data: ToDoDeleteType = {
        _id: req.query['_id'], 
        _object_id: req.query['_object_id'],
        _item_id: req.query['_item_id'],
        index: req.query['index']
      };      
      logger.info("DELETE:/v1/todos/item - get todo\n" + JSON.stringify(data, undefined, 2));      
      try {
        const reply = await Application.todos.deleteToDoItem(data);
        console.log("DELETE:/v1/todos/item reply = ", JSON.stringify(reply, undefined, 2));
        res.json({success: true, data: {ok: 1}});
      }
      catch (e) {
        console.log("POST:/v1/todos/item/add - ERROR:", e, "\n", e.stack);
        res.json({success: false, data: {error: e}});
      }
    });
    // --------------------------------------------------------------------------    
    return router;
  }

}

export default new ItemRoute();