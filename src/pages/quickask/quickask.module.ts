import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickaskPage } from './quickask';

@NgModule({
  declarations: [
    QuickaskPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickaskPage),
  ],
  exports: [
    QuickaskPage
  ]
})
export class QuickaskPageModule {}
