import { Component, Signal } from '@angular/core';
import {SignalsService} from "../services/signals.service";
import {NgFor} from "@angular/common";
import {BaseListViewDirective} from "../common/base-list-view.directive";
import {ListItemComponent} from "../list-item/list-item.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [NgFor, ListItemComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent extends BaseListViewDirective {

   constructor(protected override signalService: SignalsService,
               protected override dialog : MatDialog) {
    super(signalService, dialog);
  }

  onItemClicked(index: number): void {
    const item = this.list$()[index];
    this.openEditDialog(item, index);
  }

}
