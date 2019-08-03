import { Component } from '@angular/core';
import { ToDoModel, ToDosModel } from './common/todos.model';
import { ToDosService } from './services/todos.service';
import { ToDoAddType } from './common/todo-add.type';
import { ToDoAddItemType } from "./common/todo-add-item.type";
import { ToDoEditedType } from "./common/todo-edit-item.type";
import { ToDoDeleteType } from "./common/todo-delete-item.type";

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
  isFetching = false;
  error = null;

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    // this.getToDos();
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
        const updatedData = this.updateData(data);
        console.log("[AppComponent:getToDos] this.updateData(data) =", updatedData);

        return this.updateData(updatedData );
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  createToDos(username: string) {
    
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
    this.todosService.addNewTodoItem(this.data._id, newItem);
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

}
