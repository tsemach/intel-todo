import { Component } from '@angular/core';
import { ToDoModel, ToDosModel } from './common/todos.model';
import { ToDosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Intel ToDo';
  
  data: ToDosModel;
  current: ToDoModel;
  isFetching = false;
  error = null;
  newTodo = null;

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    this.getToDos();
  }

  getToDos() {    
    this.isFetching = true;
    this.todosService.getToDos('tsemach@intel.com', null)
    .subscribe(
      data => {
        this.isFetching = false;
        this.data = data;
        console.log("[AppComponent] data =", JSON.stringify(this.data, undefined, 2))
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onTodoTitleSelected(todo: ToDoModel) {
    this.current = todo;
    console.log("[AppComponent:onTodoTitleSelected] todo=", JSON.stringify(this.current, undefined, 2));
  }
}
