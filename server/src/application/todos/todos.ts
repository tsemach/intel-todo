import createLogger from 'logging'; 
const logger = createLogger('ToDos');

import ToDosModel from '../models/intel-todos';
import {ToDoAddItemType, ToDoAddType, ToDoEditedType, ToDoDeleteType} from '../commond/todos.type';

class ToDos {
  constructor() {
  }

  createNewUser(username: string, displayName: string) {
    console.log(`[ToDos:createNewUser] got ${username} ${displayName}`);

    const query = { username };
    const update = { username, displayName, todos: [] };
    //options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const options = { upsert: true, new: true};
        
    return ToDosModel.findOneAndUpdate(query, update, options);
  }

  getToDos(username: string) {
    logger.info('[ToDos::getToDos] going to get todos for username:',  username);

    return ToDosModel.find({username});
  }

  addToDo(data: ToDoAddType) {    
    const newTodo = { title: data.title, items: []};

    return ToDosModel.findOneAndUpdate(
      { _id: data._id }, 
      { 
        $push: { todos: newTodo }
      },
      { new: true }
    );
  }

  /**
   * from: https://stackoverflow.com/questions/38751676/insert-a-new-object-into-a-sub-document-array-field-in-mongoose/38766749
   */
  addToDoItem(data: ToDoAddItemType) {
    logger.info("[ToDos::addToDoItem] newToDoItem:", JSON.stringify(data, undefined, 2));

    const query = {_id: data._id, 'todos._id': data._object_id}
    const update = {
      $push: {
        'todos.$.items': {
          header: data.header,
          isCompleted: data.isCompleted
        }
      }
    }
    const options = { new: true };
    return ToDosModel.findOneAndUpdate(query, update, options);           
  }

  /**
   * from: https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
   */
  editToDoItem(data: ToDoEditedType) {
    logger.info("[ToDos::editToDoItem] editToDoItem:", JSON.stringify(data, undefined, 2));

    return ToDosModel.updateOne(
      {
        "_id": data._id,
        "todos": {
          "$elemMatch": {
            "_id": data._object_id, "items._id": data._item_id
          }
        }
      },
      {
        "$set": {
          "todos.$[outer].items.$[inner].header": data.header,
          "todos.$[outer].items.$[inner].isCompleted": data.isCompleted
        },
      },
      {
        "arrayFilters": [{ "outer._id": data._object_id},{ "inner._id": data._item_id }]
      }
    );
  }

  deleteToDoItem(data: ToDoDeleteType) {
    logger.info("[ToDos::deleteToDoItem] data:", JSON.stringify(data, undefined, 2));
    return ToDosModel.updateOne(
      {
        "_id": data._id,
        "todos": {
          "$elemMatch": {
            "_id": data._object_id
          }
        }
      },
      {
        "$pull": {
          "todos.$[outer].items": {_id: data._item_id},          
        },
      },
      {
        "arrayFilters": [{ "outer._id": data._object_id}]
      }
    );    
  }

}

export default ToDos;