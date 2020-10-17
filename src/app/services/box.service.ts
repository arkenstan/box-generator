import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoxPositionData } from '../models/box.model';

@Injectable({ providedIn: 'root' })
export class BoxService {
  private count = 0;
  private delta = 1;
  private defaultGap = 10;
  private _boxData = new BehaviorSubject<BoxPositionData[]>([]);
  private dataStore: BoxPositionData[] = [];
  readonly boxData = this._boxData.asObservable();

  constructor() {}

  private getIndexOfBox(boxId: number) {
    return this.dataStore.findIndex((el) => el.boxId == boxId);
  }

  publishData() {
    this._boxData.next([...this.dataStore]);
  }

  addBox() {
    ++this.count;
    const temp: BoxPositionData = {
      boxId: this.count,
      x: this.count * this.defaultGap,
      y: this.count * this.defaultGap,
    };
    this.dataStore.push(temp);
    this.publishData();
  }

  removeBox(boxId: number) {
    this.dataStore = this.dataStore.filter((el) => el.boxId !== boxId);
    this.publishData();
  }

  moveUp(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].y -= this.delta;
    this.publishData();
  }
  moveDown(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].y += this.delta;
    this.publishData();
  }
  moveLeft(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].x -= this.delta;
    this.publishData();
  }
  moveRight(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].x += this.delta;
    this.publishData();
  }
}
