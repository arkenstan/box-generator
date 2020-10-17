import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoxSizings } from '../models/config.model';
import { BoxPositionData, Coords } from '../models/box.model';

@Injectable({ providedIn: 'root' })
export class BoxService {
  private count = 0;
  private delta = 10;
  private defaultGap = 10;
  private boundingBoxWidth = 400;
  private boundingBoxHeight = 400;
  private boxWidth = 100;
  private boxHeight = 50;

  private _boxData = new BehaviorSubject<BoxPositionData[]>([]);
  private dataStore: BoxPositionData[] = [];
  readonly boxData = this._boxData.asObservable();

  constructor() {}

  getSizingConfig(): BoxSizings {
    return {
      boundingBoxSize: {
        width: this.boundingBoxWidth,
        height: this.boundingBoxHeight,
      },
      boxSize: { width: this.boxWidth, height: this.boxHeight },
    };
  }

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
    const boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].y -= this.delta;
    if (this.dataStore[boxIndex].y < 0) {
      this.dataStore[boxIndex].y = 0;
    }
    this.publishData();
  }
  moveDown(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].y += this.delta;
    if (this.dataStore[boxIndex].y + this.boxHeight >= this.boundingBoxHeight) {
      this.dataStore[boxIndex].y = this.boundingBoxHeight - this.boxHeight;
    }
    this.publishData();
  }
  moveLeft(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].x -= this.delta;
    if (this.dataStore[boxIndex].x < 0) {
      this.dataStore[boxIndex].x = 0;
    }
    this.publishData();
  }
  moveRight(boxId: number) {
    let boxIndex = this.getIndexOfBox(boxId);
    this.dataStore[boxIndex].x += this.delta;
    if (this.dataStore[boxIndex].x + this.boxWidth > this.boundingBoxWidth) {
      this.dataStore[boxIndex].x = this.boundingBoxWidth - this.boxWidth;
    }
    this.publishData();
  }
}
