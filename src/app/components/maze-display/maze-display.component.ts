import {Component, ElementRef, Input, AfterViewInit, ViewChild} from '@angular/core';
import {MazeCell} from "../../../types/maze-cell";
import {Maze} from "../../../types/maze";

@Component({
  selector: 'app-maze-display',
  templateUrl: './maze-display.component.html',
  styleUrls: ['./maze-display.component.scss']
})
export class MazeDisplayComponent implements AfterViewInit {
  private cellWidth = 1;

  @Input()
  public maze: Maze = new Maze();

  public showSolution=true;

  @Input()
  public radius: number = 0;

  @ViewChild('mazearea', {static: true})
  // @ts-ignore
  public mazeArea: ElementRef<HTMLCanvasElement>;

  // @ts-ignore
  public context: CanvasRenderingContext2D | null;

  constructor() {
  }

  private drawWall(cell: MazeCell, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    if (cell.walls[0]) {
      ctx.moveTo(cell.x * this.cellWidth, cell.y * this.cellWidth);
      ctx.lineTo((cell.x + 1) * this.cellWidth, cell.y * this.cellWidth);
    }
    if (cell.walls[1]) {
      ctx.moveTo((cell.x + 1) * this.cellWidth, cell.y * this.cellWidth);
      ctx.lineTo((cell.x + 1) * this.cellWidth, (cell.y + 1) * this.cellWidth);
    }
    if (cell.walls[2]) {
      ctx.moveTo((cell.x) * this.cellWidth, (cell.y + 1) * this.cellWidth);
      ctx.lineTo((cell.x + 1) * this.cellWidth, (cell.y + 1) * this.cellWidth);
    }
    if (cell.walls[3]) {
      ctx.moveTo(cell.x * this.cellWidth, (cell.y) * this.cellWidth);
      ctx.lineTo(cell.x * this.cellWidth, (cell.y + 1) * this.cellWidth);
    }
    ctx.stroke();
  }

  private drawSpecialField(cell: MazeCell, ctx: CanvasRenderingContext2D) {
    if (!this.maze) {
      return;
    }
    const isBegin = cell.x == this.maze.begin.x && cell.y == this.maze.begin.y;
    const isFinish = cell.x == this.maze.finish.x && cell.y == this.maze.finish.y;
    const isPartOfWayToExit = this.maze.wayToExit.find(pos => cell.x == pos.x && cell.y == pos.y) !== undefined;
    const isPlayer = cell.x == this.maze.player.x && cell.y == this.maze.player.y;

    if (isPlayer) {
      ctx.fillStyle = 'red';
    } else if (isFinish) {
      ctx.fillStyle = 'green';
    } else if (isBegin) {
      ctx.fillStyle = 'cyan';
    } else if (isPartOfWayToExit && this.showSolution) {
      ctx.fillStyle = 'lightblue';
    } else if (cell.visited) {
      ctx.fillStyle = 'lightgray';
    } else {
      ctx.fillStyle = 'brown';
    }
    ctx.fillRect(cell.x * this.cellWidth, cell.y * this.cellWidth, this.cellWidth, this.cellWidth);
  }

  public drawRegion(center: MazeCell, radius: number): void {
    const ctx = this.mazeArea.nativeElement.getContext('2d');
    if (!ctx) {
      throw new Error("Problem with ctx==null");
    }

    const cellsToRedraw = this.maze.cells.filter(value => value.x <= center.x + radius && value.x >= center.x - radius && value.y <= center.y + radius && value.y >= center.y - radius);
    for (let mazeKey in cellsToRedraw) {
      const cell = cellsToRedraw[mazeKey];
      this.drawSpecialField(cell, ctx);
      this.drawWall(cell, ctx);
    }
  }

  public drawMaze(): void {

    if (this.radius > 0) {
      this.drawRegion(this.maze.player, this.radius);
    } else {
      this.drawRegion(this.maze.player, Number.MAX_SAFE_INTEGER);
    }
  }

  // @ts-ignore
  public ngAfterViewInit(): void {
    const mazeSize = this.mazeArea.nativeElement.getBoundingClientRect();
    this.cellWidth = Math.floor(Math.min(mazeSize.width, mazeSize.height) / Math.sqrt(this.maze.cells.length));
    this.drawMaze();

  }
}
