
import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDosModel } from '../common/todos.model';
import { ToDoAddType } from '../common/todo-add.type';
import {ToDoAddItemType} from "../common/todo-add-item.type";
import {ToDoEditedType} from "../common/todo-edit-item.type";
import {ToDoDeleteType} from "../common/todo-delete-item.type";

@Injectable({providedIn: 'root'})
export class ToDosService {
  private base = 'http://localhost:3000';
  private cached = new Map<string, string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {
  }

  createNewUser(userName: string, displayName: string) {    
    const url = this.base + '/v1/user';
    return this.http
      .post<{success: string, data: any}>(
        url,
        {userName, displayName},
        this.httpOptions
      )
      .pipe(
        map((reply: {success: string, data: ToDosModel[]}) => {
          if (reply.data.length >= 1) {
            return reply.data[0];
          }
          return null;
        }
      )
    );
  }

  /**
   * retreive all todos of a specific user
   * @param username the username login into the system
   * @param isReady a subject where notify the world about incoming data
   */
  getToDos(username: string, isReady: Subject<string>) {
    const url = this.base + `/v1/todos?username=${username}`;

    return this.http
      .get(url)
      .pipe(
        map((reply: {success: string, data: ToDosModel[]}) => {
          if (reply.data.length >= 1 && reply.data[0].username === username) {
            return reply.data[0];
          }
        }
      )
    );
  }

  addNewTodo(newTodo: ToDoAddType) {
    const url = this.base + '/v1/todos';

    return this.http
      .post<{success: string, data: ToDosModel}>(
        url,
        newTodo,
        this.httpOptions
      )
      .pipe(
        map((reply: {success: string, data: ToDosModel}) => {
          console.log("[SERVICE] IN addNewTodo:", JSON.stringify(reply, undefined, 2));
          if (reply.data && reply.data._id === newTodo._id) {
            return reply.data;
          }
        }
      ));
  }

  /**
   * {
   *    _id: "5d433466cc2fd3121814e97e",
   *    _object_id: "5d442511e0d2af1169b334a5",
   *    header: "add new item shoud work",
   *    isCompleted: "false"
   * }
   */
  addNewTodoItem(_id: string, newTodoItem: ToDoAddItemType) {
    const url = this.base + '/v1/todos/item';

    return this.http
      .post<{success: string, data: any}>(
        url,
        {_id, ...newTodoItem},
        this.httpOptions
      )
      .pipe(
        map((reply: {success: string, data: ToDosModel[]}) => {          
          if (reply.data && reply.data.length > 0) {
            return reply.data[0];
          }
          return null;
        })
      );
  }

  /**
   * {
   *  index: 0
   *  isCompleted: false
   *  header: "vvvvtttttttttt"
   *  old_header: "vvvvvvvvvvvvvvvvvvvv"
   * _id: "5d433466cc2fd3121814e97e"
   * _item_id: "5d4455afab72db2c6e697324"
   * _object_id: "5d442d256e17391883bf8aa3"
   **/
  editTodoItem(editTodoItem: ToDoEditedType) {
    const url = this.base + '/v1/todos/item';
    return this.http
      .put<{success: string, data: any}>(
        url,
        editTodoItem,
        this.httpOptions
      )
      .subscribe(
        (data: any)  => {
          console.log("[ToDosService:editTodoItem] reply:", data);
        },
        error => {
          console.log("[ToDosService:editTodoItem] error:", error);
        });
  }

  /**
   * {
   *  index: 0
   *  isCompleted: false
   *  header: "vvvvtttttttttt"
   *  old_header: "vvvvvvvvvvvvvvvvvvvv"
   * _id: "5d433466cc2fd3121814e97e"
   * _item_id: "5d4455afab72db2c6e697324"
   * _object_id: "5d442d256e17391883bf8aa3"
   **/
  deleteTodoItem(item: ToDoDeleteType) {    
    const url = this.base 
      + '/v1/todos/item' 
      + `?_id=${item._id}&_object_id=${item._object_id}&_item_id=${item._item_id}&index=${item.index}`;
    
    url
    return this.http
      .delete<{success: string, data: any}>(
        url,        
        this.httpOptions
      )
      .subscribe(
        (data: any)  => {
          console.log("[ToDosService:editTodoItem] reply:", data);
        },
        error => {
          console.log("[ToDosService:editTodoItem] error:", error);
        });
  }  
}


