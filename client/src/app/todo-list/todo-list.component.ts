
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ToDoModel } from '../common/todos.model';
import {ToDoAddItemType} from "../common/todo-add-item.type";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  @Input() todo: ToDoModel;
  @Output() todoAddNewItem = new EventEmitter<ToDoAddItemType>();

  constructor() { }

  ngOnInit() {
    console.log("[ToDoListComponent:onInit]: todo=", JSON.stringify(this.todo, undefined, 2));
  }

  todoListAddNewItem(newItemName: string) {
    const newItem: ToDoAddItemType = {_object_id: this.todo._id, header: newItemName, isCompleted: false}
    console.log("[ToDoListComponent:todoListAddNewItem]: newItem =", newItem);

    this.todoAddNewItem.emit(newItem)
  }
}
