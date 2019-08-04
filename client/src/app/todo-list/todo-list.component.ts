
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ToDoModel } from '../common/todos.model';
import {ToDoAddItemType} from "../common/todo-add-item.type";
import {ToDoEditedType} from "../common/todo-edit-item.type";
import {ToDoDeleteType} from "../common/todo-delete-item.type";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  @Input() todo: ToDoModel;
  @Output() todoAddNewItem = new EventEmitter<ToDoAddItemType>();
  @Output() todoEditItem = new EventEmitter<ToDoEditedType>();
  @Output() todoDeleteItem = new EventEmitter<ToDoDeleteType>();

  constructor() { }

  ngOnInit() {
    console.log("[ToDoListComponent:onInit]: todo=", JSON.stringify(this.todo, undefined, 2));
  }

  todoListAddNewItem(newItemName: string) {
    const newItem: ToDoAddItemType = {_object_id: this.todo._id, header: newItemName, isCompleted: false}

    this.todoAddNewItem.emit(newItem)
  }

  todoListEditItem(editItem: ToDoEditedType) {
    editItem._object_id = this.todo._id;

    this.todoEditItem.emit(editItem);
  }

  todoListDeleteItem(deleteItem: ToDoDeleteType) {
    deleteItem._object_id = this.todo._id;
    
    this.todoDeleteItem.emit(deleteItem);
  }
}
