import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IntroComponent} from './components/intro/intro.component';
import {MazeControlComponent} from './components/maze-control/maze-control.component';
import {AboutComponent} from './components/about/about.component';

const routes: Routes = [
  {path: '', component: IntroComponent},
  {path: 'play', component: MazeControlComponent},
  {path: 'about', component: AboutComponent},
  // directs all other routes to the main page
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
