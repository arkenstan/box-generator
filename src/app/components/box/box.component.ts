import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Size, BoxPositionData, BoxMoveEvent } from '../../models';

@Component({
  selector: '[rectBox]',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input('size') size: Size;
  @Input('position') position: BoxPositionData;
  @Input('selected') selected: Boolean;

  @Output('focused') focused = new EventEmitter<number>();
  @Output('blurred') blurred = new EventEmitter<number>();
  @Output('moved') moved = new EventEmitter<BoxMoveEvent>();

  constructor() {}

  ngOnInit(): void {}

  onFocus() {
    this.focused.emit(this.position.boxId);
  }
  onBlur() {
    this.blurred.emit(this.position.boxId);
  }
  onMove(event: any) {
    const { key } = event;
    console.log('BoxComponent -> onMove -> key', key);
    this.moved.emit({ key });
  }
}
