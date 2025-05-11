import { Component } from '@angular/core';
import {UppercasePipe} from '../uppercase.pipe';

@Component({
  selector: 'app-pagenotfound',
  imports: [
    UppercasePipe
  ],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.scss'
})
export class PagenotfoundComponent {

}
