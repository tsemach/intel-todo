import { Component } from '@angular/core';
import { ToDoModel, ToDosModel } from './common/todos.model';
import { ToDosService } from './services/todos.service';
import { ToDoAddType } from './common/todo-add.type';
import { ToDoAddItemType } from "./common/todo-add-item.type";
import { ToDoEditedType } from "./common/todo-edit-item.type";
import { ToDoDeleteType } from "./common/todo-delete-item.type";
import { ToDoNewUserType } from './common/todo-new-user.type';

import * as _ from 'lodash';
import * as utils from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Intel ToDo';

  data: ToDosModel;
  current: ToDoModel;
  username: string = '';
  displayName: string = '';
  isFetching = false;
  isNewUser = false;
  error = null;
  public _reload = true;

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    //this.getToDos('ts');
  }

  private updateData(data: ToDosModel) {
    this.isFetching = false;
    this.data = data;
    this.current = null;
    if (this.data && this.data.todos.length > 0) {
      this.current = this.data.todos[0];
    }

    console.log("[AppComponent::updateData] data =", JSON.stringify(this.data, undefined, 2))

    return data;
  }

  getToDos(username: string) {
    this.isFetching = true;
    this.todosService.getToDos(username, null)
    .subscribe(
      data => {        
        console.log("[AppComponent:getToDos] BFOREEEEEEEEEEEEE =", JSON.stringify(data, undefined, 2));
        const updatedData = this.updateData(data);
        console.log("[AppComponent:getToDos] this.updateData(data) =", updatedData);

        return updatedData;
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }
  
  onNewUserClick() {
    this.isNewUser = true;
  }

  createNewUser(userName: string, displayName) {
    this.isFetching = true;
    this.todosService.createNewUser(userName, displayName)
      .subscribe(
        (reply: any)  => {            
          console.log("[AppComponent::createNewUser] reply=", JSON.stringify(reply, undefined, 2));

          this.updateData(reply);
        },
        error => {
          console.log("[AppComponent:createNewUser] error:", error);
        });
  }

  onNewUser(newUser: ToDoNewUserType) {
    console.log("[AppComponent:onNewUser] new user:", newUser);
    this.isNewUser = false;
    this.username = newUser.userName;
    this.displayName = newUser.displayName;

    this.createNewUser(newUser.userName, newUser.displayName);
  }

  onUsername(event: KeyboardEvent) {    
    if (event.key === 'Enter') {      
      console.log(event.target['value']);
      this.username = event.target['value'];
      console.log('username=', this.username);
      this.getToDos(this.username); 
    }
  }

  onTodoTitleSelected(todo: ToDoModel) {
    this.current = todo;
    console.log("[AppComponent:onTodoTitleSelected] todo=", JSON.stringify(this.current, undefined, 2));
  }

  onTodoAddSelected(newTodo: ToDoAddType) {
    console.log("[AppComponent:onTodoAddSelected]: newTodo enter", newTodo);
    this.todosService.addNewTodo(newTodo)
      .subscribe(
        (data: ToDosModel)  => {
          // console.log("[AppComponent:onTodoAddSelected] reply:", data);
          this.updateData(data);
        }, 
        error => {
          console.log("[AppComponent:onTodoAddSelected] error:", error);
        }
      );
  }

  onAddNewItem(newItem: ToDoAddItemType) {
    console.log("[AppComponent:onAddNewItem] new item:", newItem);
    this.todosService.addNewTodoItem(this.data._id, newItem)
      .subscribe(
        (data: any)  => {
          console.log("[AppComponent:onAddNewItem] RELOAD IS CALLED f:", JSON.stringify(data, undefined, 2)); 
          this.updateData(data);
          this.current = _.find(this.data.todos, { _id: newItem._object_id } );
        },
        error => {
          console.log("[AppComponent:onAddNewItem] error:", error);
        });
  }

  onEditItem(editItem: ToDoEditedType) {
    editItem._id = this.data._id;
    
    console.log("[AppComponent:onEditItem] edit item:", editItem);
    this.todosService.editTodoItem(editItem);
  }

  /**
   * 
   * @param deleteItem = {
   *   _id: "5d456c974d769e0f015b3b4a",
   *   _object_id: "5d456ca4ab42db4d74dd7ab5",
   *   _item_id: "5d4584cc6f0c9570038f164b",
   *   header: "fffffffffffffff",
   *   isCompleted: false,
   *   index: 0
   * }
   */
  onDeleteItem(deleteItem: ToDoDeleteType) {
    deleteItem._id = this.data._id;

    console.log("[AppComponent:onDeleteItem] delete item:", JSON.stringify(deleteItem, undefined, 2));
    const item = utils.deleteItem(this.data, deleteItem);
    console.log("[AppComponent:onDeleteItem] delete item is ok:", JSON.stringify(item, undefined, 2));
    this.todosService.deleteTodoItem(deleteItem);
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

}
