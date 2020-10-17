import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxService } from './services/box.service';
import { BoxPositionData } from './models/box.model';
import { BoxSizings } from './models/config.model';

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
    if (this.selected > 0) {
      this.lastSelected = this.selected;
    }
    this.selected = boxId;
  }
  unselectBox(boxId: number) {
    if (this.selected === boxId) {
      this.lastSelected = this.selected;
      this.selected = -1;
    }
  }

  addBox() {
    this.box$.addBox();
  }
  removeBox() {
    if (this.lastSelected > 0) {
      this.box$.removeBox(this.lastSelected);
    } else {
      console.log('Please select a box to delete');
    }
  }
  moveBox(event: any) {
    const upKeys = ['w', 'ArrowUp'];
    const downKeys = ['s', 'ArrowDown'];
    const leftKeys = ['a', 'ArrowLeft'];
    const rightKeys = ['d', 'ArrowRight'];
    const allowedKeys = [...upKeys, ...downKeys, ...leftKeys, ...rightKeys];
    const { key } = event;
    if (this.selected >= 0 && key && allowedKeys.includes(key)) {
      if (upKeys.includes(key)) {
        this.box$.moveUp(this.selected);
      } else if (downKeys.includes(key)) {
        this.box$.moveDown(this.selected);
      } else if (leftKeys.includes(key)) {
        this.box$.moveLeft(this.selected);
      } else if (rightKeys.includes(key)) {
        this.box$.moveRight(this.selected);
      }
    } else {
      console.log('Please select a box to move');
    }
  }
}
