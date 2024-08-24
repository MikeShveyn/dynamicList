import { Injectable , Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  private listSignal = signal<any[]>([]);

  getListSignal(): Signal<any[]> {
    return this.listSignal;
  }

  updateList(newList: any[]): void {
    this.listSignal.set(newList);
  }

  addItem(item: any): void {
    const currentList = this.listSignal();
    this.listSignal.set([...currentList, item]);
  }

  updateItem(index: number, updatedItem: any): void {
    const currentList = this.listSignal();
    const newList = currentList.map((item, i) => i === index ? updatedItem : item);
    this.listSignal.set(newList);
  }

}
