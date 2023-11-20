export interface Pin {
  pinSeq: number;
  pinTitle: string;
  pinDesc: string;
  image?: string;
  writer: string;
}

export interface UpImage {
  imgSeq: number;
}

export const enum Omok {
  EMPTY,
  BLACK,
  WHITE,
}
