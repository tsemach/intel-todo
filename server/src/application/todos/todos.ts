import createLogger from 'logging'; 
const logger = createLogger('ToDos');

import ToDosModel from '../models/intel-todos';
import { ToDoAddType } from '../commond/todos.type';

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
}

export default ToDos;