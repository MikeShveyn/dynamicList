import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {SignalsService} from "../services/signals.service";
import {Data} from "../data.model";

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private signalService: SignalsService,) {
  }


  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(), // Emit only if the current value is different from the last
        takeUntil(this.destroy$)
      )
      .subscribe((term) => {
        if (term!.trim() === '') {
          // If the search term is empty, reset to the original list
          this.signalService.resetList();
        } else {
          // Otherwise, filter the current list
          const currentList = this.signalService.getListSignal()();
          const filteredList = currentList.filter((item: Data) =>
            item.title.toLowerCase().includes(term!.toLowerCase())
          );
          this.signalService.updateList(filteredList);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
