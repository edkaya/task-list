import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';
  private httpClient = inject(HttpClient);

  // Send a GET request to get all tasks
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl);
  }

  // Send a GET request to get a specific task
  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseUrl}/${id}`);
  }

  // Send a POST request to add tasks
  addTask(taskName: string): Observable<Task> {
    const newTask: Task = {name: taskName, id: ''}
    return this.httpClient.post<Task>(this.baseUrl, newTask);
  }

  editTask(taskName: string, taskId: string): Observable<Task> {
    // create a param, because server put endpoint -> @Requestparam String name
    // no need to provide id, because id is resolved in url -> @Pathvariable Long id
    const params = new HttpParams().set(
      'name',
      taskName
    )
    return this.httpClient.put<Task>(`${this.baseUrl}/${taskId}`, {}, {params});
  }

  deleteTask(taskId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${taskId}`);
  }

}
