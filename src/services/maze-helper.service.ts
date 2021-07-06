import {Injectable} from '@angular/core';
import {MazeCell} from '../types/maze-cell';
import {Maze} from '../types/maze';

@Injectable({
  providedIn: 'root'
})
export class MazeHelperService {

  constructor() {
  }

  public initEmptyMazeArea(maze: Maze, width: number, height: number): void {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        maze.cells.push(new MazeCell(x, y));
      }
    }
    const cell = maze.cells.find(value => value.x === 0 && value.y === 0);
    if (!cell) {
      throw new Error('No Start found');
    }

    maze.begin = cell;
    maze.player = new MazeCell(maze.begin.x, maze.begin.y);
  }

  public findPossibleDirections(currentCell: MazeCell, maze: Maze, width: number, height: number): MazeCell[] {
    const rc: MazeCell[] = [];

    let index = this.getIndex(currentCell.x + 1, currentCell.y, width, height);
    if (index && maze.cells[index] && !maze.cells[index].visited) {
      rc.push(maze.cells[index]);
    }

    index = this.getIndex(currentCell.x - 1, currentCell.y, width, height);
    if (index && maze.cells[index] && !maze.cells[index].visited) {
      rc.push(maze.cells[index]);
    }

    index = this.getIndex(currentCell.x, currentCell.y + 1, width, height);
    if (index && maze.cells[index] && !maze.cells[index].visited) {
      rc.push(maze.cells[index]);
    }

    index = this.getIndex(currentCell.x, currentCell.y - 1, width, height);
    if (index && maze.cells[index] && !maze.cells[index].visited) {
      rc.push(maze.cells[index]);
    }

    return rc;
  }

  public getIndex(x: number, y: number, width: number, height: number): number | undefined {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return undefined;
    }
    return x + y * width;
  }
}
