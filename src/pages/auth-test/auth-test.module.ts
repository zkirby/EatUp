import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthTestPage } from './auth-test';

@NgModule({
  declarations: [
    AuthTestPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthTestPage),
  ],
  exports: [
    AuthTestPage
  ]
})
export class AuthTestPageModule {}
