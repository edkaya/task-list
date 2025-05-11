import { Routes } from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {TaskViewComponent} from './task-view/task-view.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {taskIdEnterGuard} from './task-id-enter.guard';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'tasks/:id',
    component: TaskViewComponent,
    canActivate: [taskIdEnterGuard]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];
