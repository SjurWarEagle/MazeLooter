import {Component} from '@angular/core';
import {MazeGeneratorService} from "../services/maze-generator.service";
import {Maze} from "../types/maze";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MazeLooter';
}
