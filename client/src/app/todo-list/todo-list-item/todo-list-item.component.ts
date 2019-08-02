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

  onKeydown(event) {
    if (event.key === "Enter") {
      // console.log(event);
      console.log("[TodoListItemComponent:onKeydown]", event.target.value);
      console.log("[TodoListItemComponent:onKeydown] item=", {index: this.index, ...this.item});
      this.todoItemEditClick.emit({
        _id: '',
        _object_id: '',
        _item_id: this.item._id,
        new_header: event.target.value,
        old_header: this.item.header,
        isCompleted: this.item.isCompleted,
        index: this.index
      });
    }
  }

}
