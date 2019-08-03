import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { ToDosService } from '../services/todos.service';
import { ToDosModel, ToDoModel } from '../common/todos.model';
import { ToDoAddType } from '../common/todo-add.type';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class ToDosComponent implements OnInit {
  @Output() todoTitleClick = new EventEmitter<ToDoModel>();
  @Output() todoAddTodoClick = new EventEmitter<ToDoAddType>();

  @Input() data: ToDosModel;
  newTodo = null;
  selected: ToDoModel = null;

  ngOnInit() {
  }

  onTodoTitleSelected(todo: ToDoModel) {
    this.selected = todo;
    this.todoTitleClick.emit(todo);
  }

  onAddTodo() {
    console.log("[ToDosComponent::onAddTodo] newTodo =", this.newTodo);
    this.todoAddTodoClick.emit({_id: this.data._id, title: this.newTodo})
    this.newTodo = null;
  }

  onNewTodoKeydown(event: KeyboardEvent) {    
    if (event.key === "Enter") {
      this.onAddTodo();
    }
  }
}
