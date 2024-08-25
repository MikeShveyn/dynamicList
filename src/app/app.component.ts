import { Component } from '@angular/core';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import {ListViewComponent} from "./list-view/list-view.component";
import {CardViewComponent} from "./card-view/card-view.component";
import {SignalsService} from "./services/signals.service";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {InputSearchComponent} from "./input-search/input-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListViewComponent, CardViewComponent, InputSearchComponent , NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamicList';
  viewMode : "list" | "card" = "list"

  constructor(private signalService: SignalsService,
              private dialog : MatDialog) {
    this.signalService.loadData();
  }

  openDialog(): void {
    this.dialog.open(ItemDialogComponent, {
      width: '600px',
      height: '100%',
    });
  }

}
