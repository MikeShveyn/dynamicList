import { Signal} from '@angular/core';
import {SignalsService} from "../services/signals.service";
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';


export class BaseListViewDirective {
  list$ : Signal<any[]>;

   constructor(protected signalService: SignalsService,
               protected dialog : MatDialog) {
    this.list$ = this.signalService.getListSignal();
  }

  openEditDialog(item: any, index: number): void {
    this.dialog.open(ItemDialogComponent, {
      data: { item, index },
      width: '600px',
      height: '100%',
    });
  }

}
