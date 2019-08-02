import {Component, OnInit, Input} from '@angular/core';
import {ToDoItemModel} from "../../common/todos.model";

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input() item: ToDoItemModel;

  constructor() { }

  ngOnInit() {
  }

}
