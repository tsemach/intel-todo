import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDosComponent } from './todos/todos.component';
import { ToDoListComponent } from './todolist/todolist.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDosComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
