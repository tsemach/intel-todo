
import { Component, OnInit, Input } from '@angular/core';
import { ToDoModel } from '../common/todos.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  @Input() todo: ToDoModel;

  constructor() { }

  ngOnInit() {
    console.log("[ToDoListComponent:onInit]: todo=", JSON.stringify(this.todo, undefined, 2));
  }

}
