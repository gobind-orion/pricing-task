import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceServiceService {
  data:any;
  constructor() { }
  public getData() {
    return this.data;
  }

  public setData(data:any) {
    this.data = data;
  }
}
