import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuesnavPage } from './quesnav';

@NgModule({
  declarations: [
    QuesnavPage,
  ],
  imports: [
    IonicPageModule.forChild(QuesnavPage),
  ],
  exports: [
    QuesnavPage
  ]
})
export class QuesnavPageModule {}
