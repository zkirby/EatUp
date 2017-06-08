import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { LoadingPage } from '../pages/loading/loading';
import { MenuPage } from '../pages/menu/menu';
import { MenuDataProvider } from '../providers/menu-data/menu-data';

 
@NgModule({
  declarations: [
    MyApp,
    LoadingPage,
    HomePage, 
    ItemPage,
    MenuPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoadingPage,
    HomePage,
    ItemPage,
    MenuPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuDataProvider,
  ]
})
export class AppModule {}
