import { Signal} from '@angular/core';
import {SignalsService} from "../services/signals.service";
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import {Data} from "../data.model";


export class BaseListViewDirective {
  list$ : Signal<Data[]>;

   constructor(protected signalService: SignalsService,
               protected dialog : MatDialog) {
    this.list$ = this.signalService.getListSignal();
  }


  setPage(page: number): void {
    this.signalService.setPage(page);
  }

  setItemsPerPage(count: number): void {
    this.signalService.setItemsPerPage(count);
  }

  getTotalPages(): number {
    return this.signalService.getTotalPages();
  }

  openEditDialog(item: Data, index: number): void {
    this.dialog.open(ItemDialogComponent, {
      data: { item, index },
      width: '600px',
      height: '100%',
    });
  }

}
