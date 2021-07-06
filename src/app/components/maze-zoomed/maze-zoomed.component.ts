import {Component, ElementRef, Input, AfterViewInit, ViewChild} from '@angular/core';
import {MazeCell} from '../../../types/maze-cell';
import {Maze} from '../../../types/maze';
import {minBy, maxBy} from 'lodash';

@Component({
  selector: 'app-maze-zoomed',
  templateUrl: './maze-zoomed.component.html',
  styleUrls: ['./maze-zoomed.component.scss']
})
export class MazeZoomedComponent implements AfterViewInit {
  private maxX = 1;
  private minX = 1;
  private maxY = 1;
  private minY = 1;
  public shiftX = 1;
  public shiftY = 1;

  @Input()
  public set maze(value: Maze) {
    this.localMaze = value;
    if (value && value.cells && value.cells.length > 1) {

      this.maxX = maxBy(this.localMaze.cells, (v) => v.x)!.x;
      this.minX = minBy(this.localMaze.cells, (v) => v.x)!.x;
      this.maxY = maxBy(this.localMaze.cells, (v) => v.y)!.y;
      this.minY = minBy(this.localMaze.cells, (v) => v.y)!.y;
      this.shiftX = Math.abs(this.maxX - this.minX) + 1;
      this.shiftY = Math.abs(this.maxY - this.minY) + 1;
    }

  }

  public cellWidth = 64;

  public localMaze: Maze = new Maze();

  @Input()
  public topLeft: MazeCell = new MazeCell(0, 0);

  @Input()
  public radius = 0;

  @ViewChild('mazeareaZoomed', {static: true})
  // @ts-ignore
  public mazeArea: ElementRef<HTMLCanvasElement>;

  // @ts-ignore
  public context: CanvasRenderingContext2D | null;

  constructor() {
  }

  private drawWall(cell: MazeCell, ctx: CanvasRenderingContext2D, topLeftX: number, topLeftY: number): void {
    ctx.fillStyle = 'black';
    const x = Math.abs(topLeftX - cell.x);
    const y = Math.abs(topLeftY - cell.y);

    if (cell.walls[0]) {
      ctx.moveTo(x * this.cellWidth, y * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, y * this.cellWidth);
    }
    if (cell.walls[1]) {
      ctx.moveTo((x + 1) * this.cellWidth, y * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, (y + 1) * this.cellWidth);
    }
    if (cell.walls[2]) {
      ctx.moveTo(x * this.cellWidth, (y + 1) * this.cellWidth);
      ctx.lineTo((x + 1) * this.cellWidth, (y + 1) * this.cellWidth);
    }
    if (cell.walls[3]) {
      ctx.moveTo(x * this.cellWidth, y * this.cellWidth);
      ctx.lineTo(x * this.cellWidth, (y + 1) * this.cellWidth);
    }
    ctx.stroke();
  }

  private drawTile(cell: MazeCell, ctx: CanvasRenderingContext2D, topLeftX: number, topLeftY: number): void {
    const image = new Image(512, 512);
    image.src = this.getFilenameForFloorTile(cell.walls);
    const x = Math.abs(topLeftX - cell.x);
    const y = Math.abs(topLeftY - cell.y);
    const that = this;

    image.addEventListener('load', () => {
      void ctx.drawImage(image, x * that.cellWidth, y * that.cellWidth, that.cellWidth, that.cellWidth);
    }, false);
  }

  public getFilenameForSpecialFloorTile(cell: MazeCell): string {
    if (cell.x === this.localMaze.player.x && cell.y === this.localMaze.player.y) {
      return 'assets/player.png';
    }
    if (cell.x === this.localMaze.begin.x && cell.y === this.localMaze.begin.y) {
      return 'assets/begin.png';
    }
    if (cell.x === this.localMaze.finish.x && cell.y === this.localMaze.finish.y) {
      return 'assets/exit.png';
    }
    return 'assets/empty.png';
  }

  public getFilenameForFloorTile(walls: boolean[]): string {
    if (walls[0] && !walls[1] && walls[2] && !walls[3]) {
      return 'assets/NS.png';
    } else if (!walls[0] && walls[1] && !walls[2] && walls[3]) {
      return 'assets/EW.png';
      //
    } else if (walls[0] && !walls[1] && !walls[2] && !walls[3]) {
      return 'assets/N.png';
    } else if (!walls[0] && walls[1] && !walls[2] && !walls[3]) {
      return 'assets/E.png';
    } else if (!walls[0] && !walls[1] && walls[2] && !walls[3]) {
      return 'assets/S.png';
    } else if (!walls[0] && !walls[1] && !walls[2] && walls[3]) {
      return 'assets/W.png';
      //
    } else if (walls[0] && walls[1] && !walls[2] && !walls[3]) {
      return 'assets/NE.png';
    } else if (!walls[0] && walls[1] && walls[2] && !walls[3]) {
      return 'assets/ES.png';
    } else if (!walls[0] && !walls[1] && walls[2] && walls[3]) {
      return 'assets/SW.png';
    } else if (walls[0] && !walls[1] && !walls[2] && walls[3]) {
      return 'assets/WN.png';
    } else if (walls[0] && walls[1] && walls[2] && !walls[3]) {
      return 'assets/NES.png';
    } else if (!walls[0] && walls[1] && walls[2] && walls[3]) {
      return 'assets/ESW.png';
    } else if (walls[0] && !walls[1] && walls[2] && walls[3]) {
      return 'assets/SWN.png';
    } else if (walls[0] && walls[1] && !walls[2] && walls[3]) {
      return 'assets/WNE.png';
    }
    return '';
  }

  public getStyleForCell(cell: MazeCell): string {
    const rc = `object-fit: cover; width: ${this.cellWidth}px; height: ${this.cellWidth}px; grid-column: ${cell.x}; grid-row   : ${cell.y}; z-index: -1;`;
    // console.log('rc', rc);
    return rc;
  }

  public ngAfterViewInit(): void {
  }
}
