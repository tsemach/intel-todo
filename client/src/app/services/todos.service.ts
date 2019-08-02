
import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDosModel } from '../common/todos.model';
import { ToDoAddType } from '../common/todo-add.type';

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
    
    /**
     * retreive all todos of a specific user
     * @param username the username login into the system
     * @param isReady a subject where notify the world about incoming data
     */
    getToDos(username: string, isReady: Subject<string>) {      
      const url = this.base + '/v1/todos?username=tsemach@intel.com';

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
    const url = this.base + '/v1/todos/add';

    return this.http
      .post<{success: string, data: ToDosModel}>(
        url,
        newTodo,
        this.httpOptions      
      )
      .pipe(          
        map((reply: {success: string, data: ToDosModel}) => {            
          // console.log("IN addNewTodo:", JSON.stringify(reply, undefined, 2));
          if (reply.data && reply.data._id === newTodo._id) {
            return reply.data;
          }
        }
      ));
  }

}