/* tslint:disable:object-literal-key-quotes no-angle-bracket-type-assertion */
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MazeDisplayComponent} from './components/maze-display/maze-display.component';
import {IntroComponent} from './components/intro/intro.component';
import {MazeControlComponent} from './components/maze-control/maze-control.component';
import {MazeZoomedComponent} from './components/maze-zoomed/maze-zoomed.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import * as Hammer from 'hammerjs';
import {AboutComponent} from './components/about/about.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmExitLevelComponent} from './components/confirm-exit-level/confirm-exit-level.component';
import {MatButtonModule} from '@angular/material/button';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'swipe': {direction: Hammer.DIRECTION_ALL}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MazeDisplayComponent,
    MazeZoomedComponent,
    IntroComponent,
    MazeControlComponent,
    AboutComponent,
    ConfirmExitLevelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    HammerModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmExitLevelComponent
  ]
})
export class AppModule {
  constructor() {
    const hammertime = new Hammer(document.body);

    hammertime.get('swipe').set({direction: Hammer.DIRECTION_ALL});
  }
}
