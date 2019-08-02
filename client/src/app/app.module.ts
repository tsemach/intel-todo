import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ToDosComponent } from './todos/todos.component';
import { ToDoListComponent } from './todo-list/todo-list.component';
import { ToDosService } from './services/todos.service';
import { TodoTitleComponent } from './todo-title/todo-title.component';
import { TodoListHeadComponent } from './todo-list/todo-list-head/todo-list-head.component';
import { TodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { LineThroughDirective } from './directives/line-through.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToDosComponent,
    ToDoListComponent,
    TodoTitleComponent,
    TodoListHeadComponent,
    TodoListItemComponent,
    LineThroughDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // FontAwesomeModule
  ],
  providers: [ToDosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
