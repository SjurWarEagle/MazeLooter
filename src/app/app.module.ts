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
    MazeControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    HammerModule,
    FormsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    const hammertime = new Hammer(document.body);

    hammertime.get('swipe').set({direction: Hammer.DIRECTION_ALL});
  }
}
