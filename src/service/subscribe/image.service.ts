import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../storage.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  private _itemList!: string[];
  private _itemList$ =new BehaviorSubject<string[]>([])

  constructor() { }


  get itemList$(){
    return this._itemList$.asObservable();
  }



  set itemList(value: string[]) {
    this._itemList = value;
    this._itemList$.next(value);
  }


}
