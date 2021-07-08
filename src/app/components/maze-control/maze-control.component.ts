import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Maze} from '../../../types/maze';
import {MazeGeneratorService} from '../../../services/maze-generator.service';
import {MazeDisplayComponent} from '../maze-display/maze-display.component';
import {MazeCell} from '../../../types/maze-cell';
import {MazeZoomedComponent} from '../maze-zoomed/maze-zoomed.component';
import {DataHolderService} from '../../../services/data-holder.service';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent implements OnInit {

  public zoomedMaze: Maze = new Maze();

  @ViewChild('mazedisplay', {static: true})
  public mazeDisplay: MazeDisplayComponent = new MazeDisplayComponent();

  @ViewChild('everything', {static: true})
  // @ts-ignore
  public everything: ElementRef = undefined;

  @ViewChild('mazezoomed', {static: true})
  public mazeZoomed: MazeZoomedComponent = new MazeZoomedComponent();

  public maze: Maze = new Maze();
  private radius = 3;
  // @ts-ignore
  private hammerManager: HammerManager = undefined;

  constructor(private mazeGeneratorService: MazeGeneratorService, public dataHolderService: DataHolderService) {
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'ArrowDown') || (event.key === 's') || (event.key === '2')) {
      this.moveDown();
    } else if ((event.key === 'ArrowUp') || (event.key === 'w') || (event.key === '8')) {
      this.moveUp();
    } else if ((event.key === 'ArrowRight') || (event.key === 'd') || (event.key === '6')) {
      this.moveRight();
    } else if ((event.key === 'ArrowLeft') || (event.key === 'a') || (event.key === '4')) {
      this.moveLeft();
    }
  }

  public moveLeft(): void {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
    if (playerCell && !playerCell.walls[3]) {
      this.maze.player.x--;
      this.updateAfterPlayerMovement(playerCell);
    }
  }

  public moveRight(): void {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
    if (playerCell && !playerCell.walls[1]) {
      this.maze.player.x++;
      this.updateAfterPlayerMovement(playerCell);
    }
  }

  public moveUp(): void {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
    if (playerCell && !playerCell.walls[0]) {
      this.maze.player.y--;
      this.updateAfterPlayerMovement(playerCell);
    }
  }

  public moveDown(): void {
    const playerCell: MazeCell = this.maze.cells.find(value => value.x === this.maze.player.x && value.y === this.maze.player.y)!;
    if (playerCell && !playerCell.walls[2]) {
      this.maze.player.y++;
      this.updateAfterPlayerMovement(playerCell);
    }
  }

  private updateAfterPlayerMovement(playerCell: MazeCell): void {
    if (this.checkIfPlayerCollectsLoot()) {
    } else if (this.checkIfPlayerReachedExit()) {
      this.dataHolderService.player.level++;
      this.restartNewMaze();
    } else {
      requestAnimationFrame(() => {
        if (this.mazeDisplay) {
          this.mazeDisplay.drawRegion(playerCell!, 2);
        }
        const center = this.maze.player;
        // this.mazeZoomed.drawMaze();
        const cellsToRedraw = this.maze.cells.filter(value => value.x <= center.x + this.radius && value.x >= center.x - this.radius && value.y <= center.y + this.radius && value.y >= center.y - this.radius);
        this.cloneMazeSection(cellsToRedraw);
      });
    }
  }

  private cloneMazeSection(cellsToRedraw: MazeCell[]): void {
    this.zoomedMaze = new Maze();
    this.zoomedMaze.player = this.maze.player;
    this.zoomedMaze.begin = this.maze.begin;
    this.zoomedMaze.finish = this.maze.finish;
    this.zoomedMaze.loot = this.maze.loot;
    this.zoomedMaze.cells = cellsToRedraw;
  }

  private checkIfPlayerCollectsLoot(): boolean {
    const existingLoot = this.maze.loot.find(loot => loot.x === this.maze.player.x && loot.y === this.maze.player.y && !loot.collected);
    if (existingLoot) {
      console.log('found loot');
      existingLoot.collected = true;
      this.dataHolderService.player.cntLoot++;
      return true;
    }
    return false;
  }

  private checkIfPlayerReachedExit(): boolean {
    return this.maze.player.x === this.maze.finish.x && this.maze.player.y === this.maze.finish.y;
  }

  private restartNewMaze(): void {
    const sideLengthMaze = 3 + this.dataHolderService.player.level * 2;
    this.maze = this.mazeGeneratorService.generateMaze(sideLengthMaze, sideLengthMaze);
    this.mazeGeneratorService.distributeLoot(this.maze, 2, 4);

    const center = this.maze.player;
    // this.mazeZoomed.drawMaze();
    const cellsToRedraw = this.maze.cells.filter(value => value.x <= center.x + this.radius && value.x >= center.x - this.radius && value.y <= center.y + this.radius && value.y >= center.y - this.radius);
    this.cloneMazeSection(cellsToRedraw);
  }

  public ngOnInit(): void {
    // this.hammerManager = new Hammer(this.everything.nativeElement);
    // this.hammerManager.get('swipe').set({threshold: 100});

    this.restartNewMaze();
    // this.maze = this.mazeGeneratorService.generateMaze(sideLengthMaze, sideLengthMaze);
    // this.mazeGeneratorService.distributeLoot(this.maze, 2 + this.dataHolderService.player.level, sideLengthMaze);
    this.updateAfterPlayerMovement(this.maze.player);
  }

  public swipe(event: Event): void {
    console.log('event', event);
  }

}
