import { Component } from '@angular/core';
import { ToDoModel, ToDosModel } from './common/todos.model';
import { ToDosService } from './services/todos.service';
import { ToDoAddType } from './common/todo-add.type';
import { ToDoAddItemType } from "./common/todo-add-item.type";
import { ToDoEditedType } from "./common/todo-edit-item.type";
import { ToDoDeleteType } from "./common/todo-delete-item.type";
import { ToDoNewUserType } from './common/todo-new-user.type';

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
          console.log("[AppComponent:onAddNewItem] RELOAD IS CALLED f:", data);
          this.isFetching = false;
          this.data = data;
          // this.current = null;          

          // this.reload();
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

  onDeleteItem(deleteItem: ToDoDeleteType) {
    deleteItem._id = this.data._id;

    console.log("[AppComponent:onEditItem] edit item:", deleteItem);
    this.todosService.deleteTodoItem(deleteItem);
  }

  private reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

}
