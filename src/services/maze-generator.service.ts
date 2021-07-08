import {Injectable} from '@angular/core';
import {MazeCell} from '../types/maze-cell';
import {MazeHelperService} from './maze-helper.service';
import {Maze} from '../types/maze';
import {MazeLoot} from '../types/maze-loot';

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

    this.cellStack.push(currentCell);
    this.walkMaze(maze, width, height);
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

  private walkMaze(maze: Maze, width: number, height: number): void {
    let emergency = 100_000;
    while (this.cellStack.length !== 0) {
      const currentCell = this.cellStack.pop()!;
      this.storeWayToExit(maze, currentCell);
      const selectedTarget = this.getRandomNeighbour(currentCell, maze, width, height);

      if (selectedTarget) {
        this.cellStack.push(currentCell);
        this.removeWalls(currentCell, selectedTarget);
        selectedTarget.visited = true;
        this.cellStack.push(selectedTarget);
      }
      emergency--;
      if (emergency <= 0) {
        console.log('Loop too long!');
        break;
      }
    }
  }

  private getRandomNeighbour(currentCell: MazeCell, maze: Maze, width: number, height: number): MazeCell {
    const directions = this.mazeHelperService.findPossibleDirections(currentCell, maze, width, height);

    const rnd = Math.floor(Math.random() * directions.length);
    return directions[rnd];
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

  distributeLoot(maze: Maze, cnt: number, sideLengthMaze: number): void {
    let emergency = 100_000;
    for (let i = 0; i < cnt; i++) {
      const lootX = Math.floor(Math.random() * sideLengthMaze);
      const lootY = Math.floor(Math.random() * sideLengthMaze);
      const loot = new MazeLoot(lootX, lootY);

      const alreadyExists = maze.loot.find(cell => cell.x === loot.x && cell.y === loot.y);
      const tooCloseToOtherLoot = maze.loot.find(cell => Math.abs(cell.x - loot.x) + Math.abs(cell.y - loot.y) < sideLengthMaze / 4);
      const isPartOfIdealPath = maze.wayToExit.find(cell => cell.x === loot.x && cell.y === loot.y);
      const isSpecialField = (maze.finish.x === loot.x && maze.finish.y === loot.y)
        || (maze.begin.x === loot.x && maze.begin.y === loot.y);
      if (!alreadyExists && !isPartOfIdealPath && !tooCloseToOtherLoot && !isSpecialField) {
        maze.loot.push(loot);
      } else {
        i--;
      }
      emergency--;
      if (emergency <= 0) {
        console.log('Loot-Loop too long!');
        break;
      }

    }
  }
}
