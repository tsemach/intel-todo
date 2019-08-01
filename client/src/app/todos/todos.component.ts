import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDosService } from '../services/todos.service';
import { ToDosModel, ToDoModel } from '../common/todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class ToDosComponent implements OnInit {
  @Output() todoTitleClick = new EventEmitter<ToDoModel>(); 

  data: ToDosModel;
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
        console.log("[ToDosComponent] data =", JSON.stringify(this.data, undefined, 2))
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onTodoTitleSelected(todo: ToDoModel) {
    console.log("[ToDosComponent:onTodoTitleSelected] todo=", JSON.stringify(todo, undefined, 2));
    this.todoTitleClick.emit(todo);
  }

  onAddTodo() {
    console.log("onAddTodo: newTodo=", this.newTodo);
    
  }
}
