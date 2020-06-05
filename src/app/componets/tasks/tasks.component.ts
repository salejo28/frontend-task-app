import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { TaskService } from '../../service/task.service'
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.taskService.getTasks().subscribe(
      res => {
        this.taskService.tasks = res as Task[];
      },
      err => {
        console.error(err)
      }
    )
  }

  addTask(form: NgForm) {
    if (form.value.id) {
      this.taskService.editTask(form.value)
        .subscribe(
          res => {
            this.resetForm(form)
            this.getTask();
          }
        )
    } else {
      this.taskService.createTask(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getTask()
        })
    }
  }

  removeTask(id: number) {
    if (confirm('Are you sure you want to delete it?')) {
      this.taskService.deleteTask(id)
        .subscribe(
          res => {
            this.getTask()
          }
        )
    }
  }

  putTask(task: Task) {
    this.taskService.taskSelected = task;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.taskService.taskSelected = new Task();
    }
  }

}
