import { Component, Input } from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input() item: any;
}
