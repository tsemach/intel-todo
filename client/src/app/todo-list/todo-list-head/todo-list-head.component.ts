import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list-head',
  templateUrl: './todo-list-head.component.html',
  styleUrls: ['./todo-list-head.component.scss']
})
export class TodoListHeadComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
