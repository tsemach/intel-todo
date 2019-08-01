import { Component } from '@angular/core';
import { ToDoModel } from './common/todos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  onTodoTitleSelected(todo: ToDoModel) {
    console.log("[AppComponent:onTodoTitleSelected] todo=", JSON.stringify(todo, undefined, 2));
  }
}
