import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {MazeCell} from '../../../types/maze-cell';
import {Maze} from '../../../types/maze';
import {maxBy, minBy} from 'lodash';

@Component({
  selector: 'app-maze-zoomed',
  templateUrl: './maze-zoomed.component.html',
  styleUrls: ['./maze-zoomed.component.scss']
})
export class MazeZoomedComponent {
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
    this.resize();
  }

  public cellWidth = 64;

  public localMaze: Maze = new Maze();

  @Input()
  public topLeft: MazeCell = new MazeCell(0, 0);

  @Input()
  public radius = 0;

  @ViewChild('mazeareaZoomed', {static: true})
  // @ts-ignore
  public mazeArea: ElementRef<HTMLElement>;

  // @ts-ignore
  public context: CanvasRenderingContext2D | null;

  @HostListener('window:resize', ['$event'])
  public resize(): void {
    const delta = Math.max(this.shiftX, this.shiftY);
    const width = Math.min(window.innerWidth, window.innerHeight);
    this.cellWidth = Math.floor(width / (delta + 1));
    // console.log('delta', delta);
    // console.log('Math.min(' + event.target.innerWidth + ',' + event.target.innerHeight + ')');
    // console.log('Math.min(' + window.innerWidth + ',' + window.innerHeight + ')');
    // console.log(width);
    // console.log(this.cellWidth);
    // console.log(this.minX);
    // console.log(this.maxX);
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
    if (this.localMaze.loot.find(loot => loot.x === cell.x && cell.y === loot.y && !loot.collected)) {
      return 'assets/loot.png';
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
    } else if (!walls[0] && !walls[1] && !walls[2] && !walls[3]) {
      return 'assets/empty.png';
    }
    console.log(walls);
    return '???';
  }

  public getStyleForCell(cell: MazeCell): string {
    // const delta = this.cellWidth;
    // return `width: ${delta}px; max-width: ${delta}px; height: ${delta}px; max-height: ${delta}px; grid-column: ${cell.x + 1}; grid-row: ${cell.y + 1};`;
    const delta = 100;
    return `object-fit: cover; width: ${delta}%; height: ${delta}%; grid-column: ${cell.x + 1 - this.minX}; grid-row: ${cell.y + 1 - this.minY};`;
  }

}
