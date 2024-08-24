import { Component } from '@angular/core';
import {SignalsService} from "../services/signals.service";

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent {

  searchTerm = '';

  constructor(private signalService: SignalsService) {}

  onSearchChange() {
    const currentList = this.signalService.getListSignal()();
    const filteredList = currentList.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.signalService.updateList(filteredList);
  }

}
