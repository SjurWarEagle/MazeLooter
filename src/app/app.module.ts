import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MazeDisplayComponent } from './components/maze-display/maze-display.component';
import { IntroComponent } from './components/intro/intro.component';
import { MazeControlComponent } from './components/maze-control/maze-control.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeDisplayComponent,
    IntroComponent,
    MazeControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
