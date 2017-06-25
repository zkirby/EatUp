import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { LoadingPage } from '../pages/loading/loading';
import { MenuPage } from '../pages/menu/menu';
import { QuesnavPage } from '../pages/quesnav/quesnav';
import { Quesnav2Page } from '../pages/quesnav2/quesnav2';
import { QuickaskPage } from '../pages/quickask/quickask';
import { MenuDataProvider } from '../providers/menu-data/menu-data';



 
@NgModule({
  declarations: [
    MyApp,
    LoadingPage,
    HomePage, 
    ItemPage,
    MenuPage,
    AboutPage,
    QuesnavPage,
    Quesnav2Page,
    QuickaskPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoadingPage,
    HomePage,
    ItemPage,
    MenuPage,
    AboutPage,
    QuesnavPage,
    Quesnav2Page,
    QuickaskPage
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

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
