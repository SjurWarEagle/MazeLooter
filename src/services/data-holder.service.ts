import {Injectable} from '@angular/core';
import {Player} from '../types/player';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  public player: Player = new Player();
  public confirmDialogOpen = false;

  constructor() {
  }
}
