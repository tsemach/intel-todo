import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoModel } from '../common/todos.model';

@Component({
  selector: 'app-todotile',
  templateUrl: './todotile.component.html',
  styleUrls: ['./todotile.component.scss']
})
export class ToDoTileComponent implements OnInit {
  @Input() todo: ToDoModel;
  @Output() todoTitleClick = new EventEmitter<ToDoModel>(); 

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("ToDoTileComponent: ngOnChanges, todo = ", JSON.stringify(this.todo, undefined, 2));
    console.log("ToDoTileComponent: ngOnChanges, todo.items =", this.todo.items.length);

  }

  getComplated() {
    let completed = 0;
    this.todo.items.forEach(item => {
      if (item.isCompleted) {
        completed++;
      }
    });
    return completed;
  }

  onSelect() {
    console.log("[ToDoTileComponent:onSelect] is called, title:", this.todo.title);
    this.todoTitleClick.emit(this.todo);
  }
}
