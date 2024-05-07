import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { SceneObjectComponent } from './scene-object/scene-object.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'model-viewer',
    component: ModelViewerComponent,
  },
  {
    path: 'scene-object',
    component: SceneObjectComponent,
  },{
    path: 'room',
    component: RoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
