import {Component, ElementRef, Input, AfterViewInit, ViewChild} from '@angular/core';
import {MazeCell} from "../../../types/maze-cell";
import {Maze} from "../../../types/maze";
import {min, minBy} from "lodash";

@Component({
  selector: 'app-maze-zoomed',
  templateUrl: './maze-zoomed.component.html',
  styleUrls: ['./maze-zoomed.component.scss']
})
export class MazeZoomedComponent implements AfterViewInit {
  private cellWidth = 1;

  @Input()
  public maze: Maze = new Maze();

  @Input()
  public radius: number = 0;

  @ViewChild('mazearea', {static: true})
  // @ts-ignore
  public mazeArea: ElementRef<HTMLCanvasElement>;

  // @ts-ignore
  public context: CanvasRenderingContext2D | null;

  constructor() {
  }

  private drawWall(cell: MazeCell, ctx: CanvasRenderingContext2D, topLeftX: number, topLeftY: number) {
    ctx.fillStyle = 'black';
    const x = cell.x - topLeftX;
    const y = cell.y - topLeftY;

    if (cell.walls[0]) {
      ctx.moveTo((x) * this.cellWidth, (y) * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, (y) * this.cellWidth);
    }
    if (cell.walls[1]) {
      ctx.moveTo((x + 1) * this.cellWidth, (y) * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, (y + 1) * this.cellWidth);
    }
    if (cell.walls[2]) {
      ctx.moveTo((x) * this.cellWidth, (y + 1) * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, (y + 1) * this.cellWidth);
    }
    if (cell.walls[3]) {
      ctx.moveTo((x) * this.cellWidth, (y) * this.cellWidth);
      ctx.lineTo((x) * this.cellWidth, (y + 1) * this.cellWidth);
    }
    ctx.stroke();
  }

  private drawSpecialField(cell: MazeCell, ctx: CanvasRenderingContext2D, topLeftX: number, topLeftY: number) {
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
    } else if (isPartOfWayToExit) {
      ctx.fillStyle = 'silver';
    } else if (cell.visited) {
      ctx.fillStyle = 'lightgray';
    } else {
      ctx.fillStyle = 'brown';
    }
    console.log('(cell.x - topLeftX)', (cell.x - topLeftX));
    ctx.fillRect((cell.x - topLeftX) * this.cellWidth, (cell.y - topLeftY) * this.cellWidth, this.cellWidth, this.cellWidth);
  }

  public drawRegion(center: MazeCell, radius: number): void {
    const ctx = this.mazeArea.nativeElement.getContext('2d');
    if (!ctx) {
      throw new Error("Problem with ctx==null");
    }

    const cellsToRedraw = this.maze.cells.filter(value => Math.abs(value.x - center.x) <= radius && Math.abs(value.y - center.y) <= radius);
    // console.log('cellsToRedraw',cellsToRedraw.length);
    // console.log('radius',radius);
    let topLeftX = minBy(this.maze.cells, (cell) => cell.x)!.x;
    let topLeftY = minBy(this.maze.cells, (cell) => cell.y)!.y;

    for (let mazeKey in cellsToRedraw) {
      const cell = cellsToRedraw[mazeKey];
      this.drawSpecialField(cell, ctx, topLeftX, topLeftY);
      this.drawWall(cell, ctx, topLeftX, topLeftY);
    }
  }

  public drawMaze(): void {
    if (this.radius <= 0) {
      throw new Error("Radius too small");
    }
    this.drawRegion(this.maze.player, this.radius);
  }

  public ngAfterViewInit(): void {
    const mazeSize = this.mazeArea.nativeElement.getBoundingClientRect();
    this.cellWidth = Math.floor(Math.min(mazeSize.width, mazeSize.height) / Math.sqrt(this.maze.cells.length));
    this.drawMaze();
  }
}
