import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ToDosComponent } from './todos/todos.component';
import { ToDoListComponent } from './todolist/todolist.component';
import { ToDosService } from './services/todos.service';

@NgModule({
  declarations: [
    AppComponent,
    ToDosComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ToDosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
