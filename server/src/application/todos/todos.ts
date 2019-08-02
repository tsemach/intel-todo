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

  addToDoItem(data: ToDoAddItemType) {
    data._id = "5d433466cc2fd3121814e97e";

    const newTodoItem = { header: data.header, isCompleted: false};

    console.log("addToDoItem, newToDoItem:", JSON.stringify(newTodoItem, undefined, 2));

    return ToDosModel.findOneAndUpdate(
      { _id: data._id },
      {
        $push: { items: newTodoItem }
      }
    );
  }

}

export default ToDos;