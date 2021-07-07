import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
