import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../models/task';
import { TasksComponent } from '../componets/tasks/tasks.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskSelected: Task;
  tasks: Task[];

  readonly API = 'https://app-task-apirest.herokuapp.com/tasks';

  constructor(private http: HttpClient) { 
    this.taskSelected = new Task();
  }

  getTasks() {
    return this.http.get(`${this.API}/`)
  }

  createTask(task: Task) {
    return this.http.post(this.API, task)
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

  editTask(task: Task) {
    return this.http.put(this.API + `/${task.id}`, task);
  }

}
