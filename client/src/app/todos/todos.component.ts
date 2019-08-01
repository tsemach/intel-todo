import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/todos.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class ToDosComponent implements OnInit {

  constructor(private todosService: ToDosService) { }

  ngOnInit() {
    this.todosService.getToDos('tsemach@intel.com', null);
  }

}
