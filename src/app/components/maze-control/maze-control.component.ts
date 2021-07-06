import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Maze} from '../../../types/maze';
import {MazeGeneratorService} from '../../../services/maze-generator.service';
import {MazeDisplayComponent} from '../maze-display/maze-display.component';
import {MazeCell} from '../../../types/maze-cell';
import {MazeZoomedComponent} from '../maze-zoomed/maze-zoomed.component';

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent implements OnInit {

  public zoomedMaze: Maze = new Maze();

  @ViewChild('mazedisplay', {static: true})
  public mazeDisplay: MazeDisplayComponent = new MazeDisplayComponent();

  @ViewChild('mazezoomed', {static: true})
  public mazeZoomed: MazeZoomedComponent = new MazeZoomedComponent();

  public maze: Maze = new Maze();
  private radius = 3;

  constructor(private mazeGeneratorService: MazeGeneratorService) {
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'ArrowDown') || (event.key === 's') || (event.key === '2')) {
      const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
      if (playerCell && !playerCell.walls[2]) {
        this.maze.player.y++;
        this.updateAfterPlayerMovement(playerCell);
      }
    } else if ((event.key === 'ArrowUp') || (event.key === 'w') || (event.key === '8')) {
      const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
      if (playerCell && !playerCell.walls[0]) {
        this.maze.player.y--;
        this.updateAfterPlayerMovement(playerCell);
      }
    } else if ((event.key === 'ArrowRight') || (event.key === 'd') || (event.key === '6')) {
      const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
      if (playerCell && !playerCell.walls[1]) {
        this.maze.player.x++;
        this.updateAfterPlayerMovement(playerCell);
      }
    } else if ((event.key === 'ArrowLeft') || (event.key === 'a') || (event.key === '4')) {
      const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
      if (playerCell && !playerCell.walls[3]) {
        this.maze.player.x--;
        this.updateAfterPlayerMovement(playerCell);
      }
    }
  }


  private updateAfterPlayerMovement(playerCell: MazeCell): void {
    if (this.checkIfPlayerReachedExit()) {
      console.log('done');
    } else {
      requestAnimationFrame(() => {
        if (this.mazeDisplay) {
          this.mazeDisplay.drawRegion(playerCell!, 2);
        }
        const center = this.maze.player;
        // this.mazeZoomed.drawMaze();
        const cellsToRedraw = this.maze.cells.filter(value => value.x <= center.x + this.radius && value.x >= center.x - this.radius && value.y <= center.y + this.radius && value.y >= center.y - this.radius);
        this.zoomedMaze = new Maze();
        this.zoomedMaze.player = this.maze.player;
        this.zoomedMaze.begin = this.maze.begin;
        this.zoomedMaze.finish = this.maze.finish;
        this.zoomedMaze.cells = cellsToRedraw;
      });
    }
  }

  public ngOnInit(): void {
    this.maze = this.mazeGeneratorService.generateMaze(15, 15);
    this.updateAfterPlayerMovement(this.maze.player);
  }

  private checkIfPlayerReachedExit(): boolean {
    return this.maze.player.x === this.maze.finish.x && this.maze.player.x === this.maze.finish.x;
  }
}
