import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ToDoNewUserType } from '../common/todo-new-user.type';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Output() submit = new EventEmitter<ToDoNewUserType>();    

  userName = '';
  displayName = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit({userName: this.userName, displayName: this.displayName} as ToDoNewUserType);
  }
}
