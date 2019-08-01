import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDosModel } from '../common/todos.model';

@Injectable({providedIn: 'root'})
export class ToDosService {
    private base = 'http://localhost:3000/v1/todos?username=tsemach@intel.com';
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
    getToDos(userame: string, isReady: Subject<string>) {      
      return this.http
        .get(this.base)
        .pipe(
          map((reply: {success: string, data: ToDosModel[]}) => {
            const todos: ToDosModel[] = [];
            console.log("in getToDos:", JSON.stringify(reply, undefined, 2))
            console.log("in getToDos:", JSON.stringify(reply['data'], undefined, 2))
            reply['data'].forEach((r: ToDosModel)  => {
              console.log("inside loop: r=", r)
            });
            return reply;
          }
        )
      );
    } 

}