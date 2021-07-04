export class MazeCell {
  public visited: boolean = false;
  public walls: boolean[] = [true, true, true, true];

  constructor(public x: number, public y: number) {
  }


}
