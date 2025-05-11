import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {TaskService} from './task-service/task.service';
import {catchError, map, of} from 'rxjs';

export const taskIdEnterGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  const taskService = inject(TaskService);

  if (!id) {
    return false;
  }

  return taskService.getTaskById(id).pipe(
    map(task => !!task),
    catchError(() => of(false))
  );
};
