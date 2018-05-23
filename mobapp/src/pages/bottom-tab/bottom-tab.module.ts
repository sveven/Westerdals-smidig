import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BottomTabPage } from './bottom-tab';

@NgModule({
  declarations: [
    BottomTabPage,
  ],
  imports: [
    IonicPageModule.forChild(BottomTabPage),
  ]
})
export class BottomTabPageModule {}
