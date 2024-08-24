import { Injectable } from '@angular/core';
import {SignalsService} from "./signals.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private signalService: SignalsService) {}

  loadData(): void {
    this.http.get<any[]>('data.json').subscribe((data: any) => {
      this.signalService.updateList(data);
    });
  }
}
