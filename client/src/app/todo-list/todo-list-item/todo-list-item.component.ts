import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToDoItemModel, ToDoModel} from "../../common/todos.model";

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input() item: ToDoItemModel;
  @Output() todoItemEditClick = new EventEmitter<ToDoModel>();

  constructor() { }

  ngOnInit() {
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      // console.log(event);
      console.log("[TodoListItemComponent:onKeydown]", event.target.value);

    }
  }

}
