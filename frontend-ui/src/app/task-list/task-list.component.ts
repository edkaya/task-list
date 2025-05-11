import {Component, inject, signal, WritableSignal, OnInit} from '@angular/core';
import {TaskService} from '../task-service/task.service';
import {Task} from '../models/task.model';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  // services
  private taskService = inject(TaskService);

  // variables
  tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  newTask = signal<string>('')

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: (err) => console.log(err)
    });
  }

  addNewTask() {
    this.taskService.addTask(this.newTask()).subscribe({
      next: (task) => this.tasks.update(currentTasks => [...currentTasks, task]),
      error: (err) => console.log(err)
    });
  }
}
