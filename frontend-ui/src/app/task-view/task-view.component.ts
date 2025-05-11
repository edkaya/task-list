import {Component, OnInit, inject, WritableSignal, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TaskService} from '../task-service/task.service';
import {Task} from '../models/task.model';
import {FormsModule} from '@angular/forms';
import { HighlightDirective } from '../highlight.directive';
import { UppercasePipe } from '../uppercase.pipe';

@Component({
  selector: 'app-task-view',
  imports: [
    FormsModule,
    HighlightDirective,
    UppercasePipe,
    RouterLink
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  selectedTask: WritableSignal<Task> = signal<Task>({name: '', id: ''});
  selectedId: string = '';

  isEditing = signal(false);
  newName = signal('');

  ngOnInit(): void {
        //this.selectedId = this.route.snapshot.paramMap.get('id')!; // get param static (one-time), does not detect id changes
        this.route.paramMap.subscribe(params => { // get param reactive (observable), runs everytime the route param changes
          this.selectedId = params.get('id')!;
        })
        this.taskService.getTaskById(this.selectedId).subscribe(
          (task) => this.selectedTask.set(task)
        )
  }

  editTask() {
    this.isEditing.set(true);
  }

  saveChanges() {
    this.taskService.editTask(this.newName(), this.selectedId).subscribe(
      (task) => this.selectedTask.set(task)
    );
    this.isEditing.set(false);
  }

  deleteTask() {
    this.taskService.deleteTask(this.selectedId).subscribe({
      next: () => {},
      complete: () => {
        this.router.navigate(['/tasks']);
      }
    });
  }

}
