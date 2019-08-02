import createLogger from 'logging'; 
const logger = createLogger('ToDos');

import ToDosModel from '../models/intel-todos';
import {ToDoAddItemType, ToDoAddType} from '../commond/todos.type';

class ToDos {
  constructor() {
  }

  getToDos(username: string) {
    logger.info('goinf to get todos for username:',  username);

    return ToDosModel.find({username});
  }

  addToDo(data: ToDoAddType) {    
    const newTodo = { title: data.title, items: []};

    return ToDosModel.findOneAndUpdate(
      { _id: data._id }, 
      { 
        $push: { todos: newTodo }
      }
    );
  }

  /**
   * from: https://stackoverflow.com/questions/38751676/insert-a-new-object-into-a-sub-document-array-field-in-mongoose/38766749
   */
  addToDoItem(data: ToDoAddItemType) {
    // data = {
    //   "_id": "5d433466cc2fd3121814e97e",
    //   "_object_id": "5d442511e0d2af1169b334a5",
    //   "header": "add new item sdvsvdsvdsdv",
    //   "isCompleted": false
    // }

    logger.info("[ToDos::addToDoItem] newToDoItem:", JSON.stringify(data, undefined, 2));
    return ToDosModel.updateMany(
      {_id: data._id, 'todos._id': data._object_id},
      {
        $push: {
          'todos.$.items': {
            header: data.header,
            isCompleted: data.isCompleted
          }
        }
      }
    );
  }

}

export default ToDos;