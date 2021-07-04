import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Maze} from "../../../types/maze";
import {MazeGeneratorService} from "../../../services/maze-generator.service";
import {MazeDisplayComponent} from "../maze-display/maze-display.component";
import {MazeCell} from "../../../types/maze-cell";

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent implements OnInit {

  @ViewChild('mazedisplay', {static: true})
  public mazeDisplay: MazeDisplayComponent = new MazeDisplayComponent;

  public maze: Maze = new Maze();

  constructor(private mazeGeneratorService: MazeGeneratorService) {
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y)!;
    if (event.key == 'ArrowDown') {
      // console.log('down');
      if (playerCell && !playerCell.walls[2]) {
        this.maze.player.y++;
      }
    } else if (event.key == 'ArrowUp') {
      // console.log('up');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[0]) {
        this.maze.player.y--;
      }
    } else if (event.key == 'ArrowRight') {
      // console.log('right');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[1]) {
        this.maze.player.x++;
      }
    } else if (event.key == 'ArrowLeft') {
      // console.log('left');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[3]) {
        this.maze.player.x--;
      }
    }
    setTimeout(() => {
      this.mazeDisplay.drawRegion(playerCell!, 2);
      // this.mazeDisplay.drawMaze();
    });
  }

  public ngOnInit(): void {
    this.maze = this.mazeGeneratorService.generateMaze(10, 10);
  }

}
