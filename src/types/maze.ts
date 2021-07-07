import {MazeCell} from './maze-cell';
import {MazeLoot} from './maze-loot';

export class Maze {
  public cells: MazeCell[] = [];
  public begin: MazeCell = new MazeCell(0, 0);
  public player: MazeCell = new MazeCell(0, 0);
  public finish: MazeCell = new MazeCell(1, 1);
  public wayToExit: MazeCell[] = [];
  public loot: MazeLoot[] = [];
}
