import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToDoModel} from "../../common/todos.model";

@Component({
  selector: 'app-todo-list-head',
  templateUrl: './todo-list-head.component.html',
  styleUrls: ['./todo-list-head.component.scss']
})
export class TodoListHeadComponent implements OnInit {
  @Input() title: string;
  @Input() count: string;
  @Output() todoListHeadAddNewItem = new EventEmitter<string>();

  isAddNewItemEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  onAddNewItem(event) {
    if (event.key === "Enter") {
      // console.log(event);
      console.log("[TodoListHeadComponent:onAddNewItem]", event.target.value);
      this.todoListHeadAddNewItem.emit(event.target.value);

      this.isAddNewItemEnabled = false;
    }
  }

  onAddNewItemLink() {
    this.isAddNewItemEnabled = true;
  }

}
