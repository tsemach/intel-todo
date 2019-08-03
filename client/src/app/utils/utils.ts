import * as _ from 'lodash';

import { ToDoDeleteType } from "../common/todo-delete-item.type";
import { ToDosModel } from "../common/todos.model";

/**
 * remove the _item_id from data and return it.
 * @param data 
 * @param deleteItem 
 */
function deleteItem(data: ToDosModel, deleteItem: ToDoDeleteType) {
  if ( ! data ) {
    return null;
  }

  const todo = _.find(data.todos, { items: [ { _id: deleteItem._item_id } ]});
  if ( ! todo ) {
    throw new Error(`item ${deleteItem._item_id} not found`);
  }
  const item = _.remove(todo.items, { _id: deleteItem._item_id });

  return item;
}

export { 
  deleteItem
}

