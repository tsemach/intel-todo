import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToDoItemModel, ToDoModel} from "../../common/todos.model";
import {ToDoEditedType} from "../../common/todo-edit-item.type";

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input() item: ToDoItemModel;
  @Input() index: number;
  @Output() todoItemEditClick = new EventEmitter<ToDoEditedType>();

  constructor() { }

  ngOnInit() {
  }

  onItemChange(header: string, isCompleted: boolean) {
    this.todoItemEditClick.emit({
      _id: '',
      _object_id: '',
      _item_id: this.item._id,
      header,
      isCompleted,
      index: this.index
    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      // console.log(event);
      console.log("[TodoListItemComponent:onKeydown]", event.target.value);
      console.log("[TodoListItemComponent:onKeydown] item=", {index: this.index, ...this.item});
      this.onItemChange(event.target.value, this.item.isCompleted);
      // this.todoItemEditClick.emit({
      //   _id: '',
      //   _object_id: '',
      //   _item_id: this.item._id,
      //   header: event.target.value,
      //   isCompleted: this.item.isCompleted,
      //   index: this.index
      // });
    }
  }

  onCompletedClick() {
    console.log("[TodoListItemComponent:onCompletedClick] isCompleted:", this.item.isCompleted);
    this.onItemChange(this.item.header, this.item.isCompleted);
  }
}
