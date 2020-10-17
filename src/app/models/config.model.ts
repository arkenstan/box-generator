export interface Size {
  width: number;
  height: number;
}

export interface BoxSizings {
  boundingBoxSize: Size;
  boxSize: Size;
}

export interface BoxMoveEvent {
  key: string;
}
