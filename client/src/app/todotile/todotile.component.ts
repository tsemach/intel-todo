import { Component, OnInit, Input } from '@angular/core';
import { ToDoModel } from '../common/todos.model';

@Component({
  selector: 'app-todotile',
  templateUrl: './todotile.component.html',
  styleUrls: ['./todotile.component.scss']
})
export class ToDoTileComponent implements OnInit {
  @Input() todo: ToDoModel;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("ToDoTileComponent: ngOnChanges, todo = ", JSON.stringify(this.todo, undefined, 2));
    console.log("ToDoTileComponent: ngOnChanges, todo.items =", this.todo.items.length);

  }

  getComplated() {
    
  }
}
