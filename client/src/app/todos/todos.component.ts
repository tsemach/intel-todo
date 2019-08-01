import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/todos.service';
import { ToDosModel } from '../common/todos.model';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class ToDosComponent implements OnInit {
  todos: {success: string, data: ToDosModel[]}

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    this.todosService.getToDos('tsemach@intel.com', null)
    .subscribe(
      todos => {
        this.todos = todos;
        console.log("todos=", JSON.stringify(this.todos))
        // this.isFetching = false;
        // this.loadedPosts = posts;
      },
      error => {
        // this.error = error.message;
        console.log(error);
      })
    }
}
