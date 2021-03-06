import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxService } from './services/box.service';
import { BoxPositionData, BoxSizings, BoxMoveEvent } from './models';

export interface BoxData {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  count = 0;
  selected = -1;
  lastSelected = -1;
  sizeConfig: BoxSizings;
  boxData: Observable<BoxPositionData[]>;

  constructor(public box$: BoxService) {}

  ngOnInit() {
    this.sizeConfig = this.box$.getSizingConfig();
    this.boxData = this.box$.boxData;
  }

  isSelected(boxId: number) {
    return this.selected === boxId;
  }

  selectBox(boxId: number) {
    if (this.selected >= 0) {
      this.lastSelected = this.selected;
    }
    this.selected = boxId;
  }

  addBox() {
    this.box$.addBox();
  }
  moveBox(event: BoxMoveEvent) {
    const { key } = event;
    const upKeys = ['w', 'ArrowUp'];
    const downKeys = ['s', 'ArrowDown'];
    const leftKeys = ['a', 'ArrowLeft'];
    const rightKeys = ['d', 'ArrowRight'];
    const deleteKeys = ['Delete'];
    const allowedKeys = [
      ...upKeys,
      ...downKeys,
      ...leftKeys,
      ...rightKeys,
      ...deleteKeys,
    ];
    if (this.selected >= 0 && key && allowedKeys.includes(key)) {
      if (upKeys.includes(key)) {
        this.box$.moveUp(this.selected);
      } else if (downKeys.includes(key)) {
        this.box$.moveDown(this.selected);
      } else if (leftKeys.includes(key)) {
        this.box$.moveLeft(this.selected);
      } else if (rightKeys.includes(key)) {
        this.box$.moveRight(this.selected);
      } else if (deleteKeys.includes(key)) {
        this.box$.removeBox(this.selected);
        this.selected = -1;
      }
    } else {
      console.log('Please select a box');
    }
  }
}
