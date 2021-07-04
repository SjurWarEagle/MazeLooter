import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Maze} from "../../../types/maze";
import {MazeGeneratorService} from "../../../services/maze-generator.service";
import {MazeDisplayComponent} from "../maze-display/maze-display.component";
import {MazeCell} from "../../../types/maze-cell";
import {MazeZoomedComponent} from "../maze-zoomed/maze-zoomed.component";

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent implements OnInit {

  @ViewChild('mazedisplay', {static: true})
  public mazeDisplay: MazeDisplayComponent = new MazeDisplayComponent;

  @ViewChild('mazezoomed', {static: true})
  public mazeZoomed: MazeZoomedComponent = new MazeZoomedComponent;

  public maze: Maze = new Maze();

  constructor(private mazeGeneratorService: MazeGeneratorService) {
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent) {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y)!;
    console.log('event',event.key);
    if ((event.key == 'ArrowDown')||(event.key == 's')) {
      // console.log('down');
      if (playerCell && !playerCell.walls[2]) {
        this.maze.player.y++;
      }
    } else if ((event.key == 'ArrowUp')||(event.key == 'w')) {
      // console.log('up');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[0]) {
        this.maze.player.y--;
      }
    } else if ((event.key == 'ArrowRight')||(event.key == 'd')) {
      // console.log('right');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[1]) {
        this.maze.player.x++;
      }
    } else if ((event.key == 'ArrowLeft')||(event.key == 'a')) {
      // console.log('left');
      const playerCell = this.maze.cells.find(value => value.x == this.maze.player.x && value.y == this.maze.player.y);
      if (playerCell && !playerCell.walls[3]) {
        this.maze.player.x--;
      }
    }
    setTimeout(() => {
      this.mazeDisplay.drawRegion(playerCell!, 2);
      this.mazeZoomed.drawMaze();
    });
  }

  public ngOnInit(): void {
    this.maze = this.mazeGeneratorService.generateMaze(10, 10);
  }

}
