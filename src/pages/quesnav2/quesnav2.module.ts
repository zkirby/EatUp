import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Quesnav2Page } from './quesnav2';

@NgModule({
  declarations: [
    Quesnav2Page,
  ],
  imports: [
    IonicPageModule.forChild(Quesnav2Page),
  ],
  exports: [
    Quesnav2Page
  ]
})
export class Quesnav2PageModule {}
