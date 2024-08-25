import {Component, OnInit, Signal} from '@angular/core';
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
export class CardViewComponent extends BaseListViewDirective implements OnInit {
  currentPage = 1;

  constructor(protected override signalService: SignalsService,
              protected override dialog : MatDialog) {
    super(signalService, dialog);
  }

  ngOnInit(): void {
    this.signalService.loadData(); // Load initial data
  }

  override setPage(page: number): void {
    super.setPage(page);
    this.currentPage = page; // Update the current page in the component
  }

  override setItemsPerPage(count: number): void {
    super.setItemsPerPage(count);
    this.currentPage = 1; // Reset to the first page when items per page changes
  }

   onItemClicked(index: number): void {
    const item = this.list$()[index];
    this.openEditDialog(item, index);
  }


}
