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

  @Input() selected: ToDoModel = null;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
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
    this.todoTitleClick.emit(this.todo);
  }

  isHighlight() {
    if ( ! this.selected ) {
      return false;
    }
    console.log("[TodoTitleComponent:onSelect] this.todo._id === this.selected._id", this.todo._id === this.selected._id);    
    return this.todo._id === this.selected._id;
    //return false;
  }
}
