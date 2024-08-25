import { Component , Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Data} from "../data.model";

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  @Input() item: Data | undefined;
}
