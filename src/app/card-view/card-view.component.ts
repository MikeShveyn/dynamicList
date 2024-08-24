import { Component, Signal } from '@angular/core';
import {SignalsService} from "../services/signals.service";
import {NgFor} from "@angular/common";
import {BaseListViewDirective} from "../common/base-list-view.directive";
import {CardItemComponent} from "../card-item/card-item.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [NgFor, CardItemComponent],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css'
})
export class CardViewComponent extends BaseListViewDirective{


  constructor(protected override signalService: SignalsService,
              protected override dialog : MatDialog) {
    super(signalService, dialog);
  }

  onItemClicked(index: number): void {
    const item = this.list$()[index];
    this.openEditDialog(item, index);
  }

}
