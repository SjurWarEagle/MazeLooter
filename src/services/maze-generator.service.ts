import {Injectable} from '@angular/core';
import {MazeCell} from '../types/maze-cell';
import {MazeHelperService} from './maze-helper.service';
import {Maze} from '../types/maze';

@Injectable({
  providedIn: 'root'
})
export class MazeGeneratorService {
  private cellStack: MazeCell[] = [];

  constructor(private mazeHelperService: MazeHelperService) {
  }

  public generateMaze(width: number, height: number): Maze {
    const maze: Maze = new Maze();

    this.mazeHelperService.initEmptyMazeArea(maze, width, height);
    maze.finish = maze.cells.find(value => value.x === width - 1 && value.y === height - 1)!;
    if (!maze.finish) {
      throw new Error('no finish point found');
    }
    const currentCell: MazeCell | undefined = maze.cells.find(value => value.x === maze.begin.x && value.y === maze.begin.y);
    if (!currentCell) {
      throw new Error('no starting point found');
    }

    this.walkMaze(maze, currentCell, width, height);
    return maze;
  }

  private storeWayToExit(maze: Maze, currentCell: MazeCell): void {
    if (currentCell.x === maze.finish.x && currentCell.y === maze.finish.y) {
      maze.wayToExit = [];
      this.cellStack.forEach(value => {
        // if (!maze.wayToExit.find(value1 => value1.x==value.x&&value1.y==value.y)){
        maze.wayToExit.push(value);
        // }
      });
    }
  }

  private walkMaze(maze: Maze, currentCell: MazeCell, width: number, height: number): void {

    currentCell.visited = true;

    const directions = this.mazeHelperService.findPossibleDirections(currentCell, maze, width, height);

    const rnd = Math.floor(Math.random() * directions.length);
    const selectedTarget = directions[rnd];
    if (selectedTarget) {
      if (!selectedTarget.visited) {
        this.cellStack.push(selectedTarget);
        this.removeWalls(currentCell, selectedTarget);
        this.storeWayToExit(maze, currentCell);
        this.walkMaze(maze, selectedTarget, width, height);
      }
    } else {
      const oldCell = this.cellStack.pop();
      if (oldCell) {
        this.walkMaze(maze, oldCell, width, height);
      }
    }
  }

  removeWalls(currentCell: MazeCell, targetCell: MazeCell): void {

    if (currentCell.x < targetCell.x) {
      currentCell.walls[1] = false;
      targetCell.walls[3] = false;
    }
    if (currentCell.x > targetCell.x) {
      currentCell.walls[3] = false;
      targetCell.walls[1] = false;
    }
    if (currentCell.y < targetCell.y) {
      currentCell.walls[2] = false;
      targetCell.walls[0] = false;
    }
    if (currentCell.y > targetCell.y) {
      currentCell.walls[0] = false;
      targetCell.walls[2] = false;
    }
  }

}
