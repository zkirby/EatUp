import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization';

import { MyApp } from './app.component';
import { LoadingPage } from '../pages/loading/loading';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { MenuPage } from '../pages/menu/menu';
 
@NgModule({
  declarations: [
    MyApp,
    LoadingPage,
    HomePage, 
    ItemPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoadingPage,
    HomePage,
    ItemPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
