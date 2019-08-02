import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoModel } from '../common/todos.model';

@Component({
  selector: 'app-todo-title',
  templateUrl: './todo-title.component.html',
  styleUrls: ['./todo-title.component.scss']
})
export class TodoTitleComponent implements OnInit {
  @Input() todo: ToDoModel;
  @Output() todoTitleClick = new EventEmitter<ToDoModel>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log("TodoTitleComponent: ngOnChanges, todo = ", JSON.stringify(this.todo, undefined, 2));
    // console.log("TodoTitleComponent: ngOnChanges, todo.items =", this.todo.items.length);

  }

  getCompleted() {
    let completed = 0;
    this.todo.items.forEach(item => {
      if (item.isCompleted) {
        completed++;
      }
    });
    return completed;
  }

  onSelect() {
    // console.log("[TodoTitleComponent:onSelect] is called, title:", this.todo.title);
    this.todoTitleClick.emit(this.todo);
  }
}
