import createLogger from 'logging'; 
const logger = createLogger('ToDos');

import ToDosModel from '../models/intel-todos';
import {ToDoAddItemType, ToDoAddType, ToDoEditedType} from '../commond/todos.type';

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
    )
  }

}

export default ToDos;