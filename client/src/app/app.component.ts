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
import { Subject } from 'rxjs';

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
  success = false;
  error = null;
  alert = '';
  
  private alertsSubject = new Subject<{type: string, message: string}>();
  public _reload = true;

  constructor(private todosService: ToDosService) { }

  ngOnInit() {    
  }

  private updateData(data: ToDosModel) {
    this.isFetching = false;
    this.success = true;
    this.data = data;
    this.current = null;
    
    if (this.data && this.data.todos.length > 0) {
      this.current = this.data.todos[0];
    }
    
    if (this.data && this.data.displayName) {
      this.displayName = data.displayName;
    }

    return data;
  }

  getToDos(username: string) {
    this.isFetching = true;
    this.todosService.getToDos(username, null)
    .subscribe(
      reply => {        
        console.log("[AppComponent:getToDos] got todos =", JSON.stringify(reply, undefined, 2));
        if ( ! reply ) {
          this.success = false;
          this.data = null;
          this.isFetching = false;
          this.alertsSubject.next({type: 'danger', message: 'Got failed status from server'})

          return;          
        }
        this.success = reply.success === true;
        const updatedData = this.updateData(reply.data);        

        const alertType = reply.success === true ? 'success' : 'danger';
        const alertMess = reply.success === true ? 'Successful loading user data' : 'Failed loading, server return failed status';
        this.alertsSubject.next({type: alertType, message: alertMess});

        return updatedData;
      },
      error => {
        this.alertsSubject.next({type: 'danger', message: `Failed loading: ${error.message}`})
        this.error = error.message;
        console.error(error);
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

          const alertType = reply.success === true ? 'success' : 'danger';
          const alertMess = reply.success === true ? 'Successful create new user' : 'Failed create user, server return failed status';
          this.alertsSubject.next({type: alertType, message: alertMess});

          this.updateData(reply.data);
        },
        error => {
          this.isFetching = false                    
          this.alertsSubject.next({type: 'danger', message: `Unxpected Error: ${error}`});

          console.error("[AppComponent:createNewUser] error:", error);
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
      this.username = event.target['value'];

      this.getToDos(this.username); 
    }
  }

  onTodoTitleSelected(todo: ToDoModel) {
    this.current = todo;
    console.log("[AppComponent:onTodoTitleSelected] todo=", JSON.stringify(this.current, undefined, 2));
  }

  onTodoAddSelected(newTodo: ToDoAddType) {
    this.todosService.addNewTodo(newTodo)
      .subscribe(
        (reply: {success: boolean, data: ToDosModel})  => {
          if (reply.success && reply.data) {
            this.alertsSubject.next({type: 'success', message: 'Successful add new todo'});

            return this.updateData(reply.data);
          }
          this.alertsSubject.next({type: 'danger', message: 'Failed add new todo, server return failed status'});
        }, 
        error => {          
          console.error("[AppComponent:onTodoAddSelected] error:", error);
          this.alertsSubject.next({type: 'danger', message: 'Unxpected Error: expected error during add new todo'});
        }
      );
  }

  onAddNewItem(newItem: ToDoAddItemType) {
    this.todosService.addNewTodoItem(this.data._id, newItem)
      .subscribe(
        (data: any)  => {
          this.updateData(data);
          this.current = _.find(this.data.todos, { _id: newItem._object_id } );
        },
        error => {
          console.error("[AppComponent:onAddNewItem] error:", error);
        });
  }

  onEditItem(editItem: ToDoEditedType) {
    editItem._id = this.data._id;
        
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
    utils.deleteItem(this.data, deleteItem);
    
    this.todosService.deleteTodoItem(deleteItem)
      .subscribe(
        (data: any)  => {
          console.log("[AppComponent:onDeleteItem] reply:", data);

          const alertType = data.success ? 'success' : 'danger';
          const alertMess = data.success ? `Successful delete item ${deleteItem.header}` : `Failed delete: server return failed status for ${deleteItem.header}`;          
          this.alertsSubject.next({type: alertType, message: alertMess});
        },
        error => {
          const alertType = 'danger';
          const alertMess = `Expected Error: unhandle error when delete ${deleteItem.header}`;          
          this.alertsSubject.next({type: alertType, message: alertMess});
          
          console.error("[AppComponent:onDeleteItem] error:", error);
        });
  }

  onRefreshClick() {
    if (this.username) {
      this.getToDos(this.username);
    }
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

}
