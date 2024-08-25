import {Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "../data.model";

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  private originalList: Data[] = []; // Store the original list
  private listSignal = signal<Data[]>([]);

  private currentPage = 1;
  private itemsPerPage = 5;


  constructor(private http: HttpClient) {}

  loadData(): void {
    this.http.get<any[]>('data.json').subscribe((data: Data[]) => {
      this.setOriginalList(data);
      this.paginateList(); // Apply initial pagination
    });
  }

  // Method to set the original list initially
  setOriginalList(list: Data[]): void {
    this.originalList = list;
    this.listSignal.set(list); // Initialize the list with the original data
  }

  // Get the list signal
  getListSignal(): Signal<Data[]> {
    return this.listSignal;
  }

  // Update the list signal
  updateList(newList: Data[]): void {
    this.listSignal.set(newList);
  }

  // Add an item to the list
  addItem(item: Data): void {
    this.originalList.push(item); // Add to the original list
    this.paginateList();
  }

  // Update an item in the list by index
  updateItem(index: number, updatedItem: Data): void {
    this.originalList[index] = updatedItem;
    this.paginateList();
  }

  // Reset the list to the original state
  resetList(): void {
    this.setPage(1);
    this.listSignal.set(this.originalList);
    this.paginateList();
  }


  setPage(page: number): void {
    this.currentPage = page;
    this.paginateList();
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPage = count;
    this.paginateList();
  }

  getTotalPages(): number {
    return Math.ceil(this.originalList.length / this.itemsPerPage);
  }

  private paginateList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedItems = this.originalList.slice(startIndex, endIndex);
    this.updateList(paginatedItems); // Update the signal with the paginated list
  }

}
