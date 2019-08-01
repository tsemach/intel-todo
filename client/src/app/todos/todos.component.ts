import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/todos.service';
import { ToDosModel } from '../common/todos.model';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class ToDosComponent implements OnInit {
  data: ToDosModel;
  isFetching = false;
  error = null;

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    this.getToDos();
    // this.isFetching = true;
    // this.todosService.getToDos('tsemach@intel.com', null)
    // .subscribe(
    //   data => {
    //     this.data = data;
    //     // console.log("data =", JSON.stringify(this.data, undefined, 2))
    //     // console.log("data.legnth =", this.data.length)
    //     this.isFetching = false;
    //     // this.isFetching = false;
    //     // this.loadedPosts = posts;
    //   },
    //   error => {
    //     console.log(error);
    //     this.error = error.message;
    //   })
  }

  getToDos() {    
    this.isFetching = true;
    this.todosService.getToDos('tsemach@intel.com', null)
    .subscribe(
      data => {
        this.isFetching = false;
        this.data = data;
        console.log("[ToDosComponent] data =", JSON.stringify(this.data, undefined, 2))
      },
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }
}
