import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { TranslatePoHttpLoader } from '../../node_modules/@biesbjerg/ngx-translate-po-http-loader';


import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoadingPage } from '../pages/loading/loading';
import { MenuPage } from '../pages/menu/menu';
import { Quesnav2Page } from '../pages/quesnav2/quesnav2';
import { QuickaskPage } from '../pages/quickask/quickask';
import { TranslatorPage } from '../pages/translator/translator';

import { MenuDataProvider } from '../providers/menu-data/menu-data';
import { LanguageDataProvider } from '../providers/language-data/language-data';
import { TranslateDataProvider } from '../providers/translate-data/translate-data';


@NgModule({
  declarations: [
    MyApp,
    LoadingPage,
    HomePage, 
    MenuPage,
    AboutPage,
    Quesnav2Page,
    QuickaskPage,
    TranslatorPage
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
    MenuPage,
    AboutPage,
    Quesnav2Page,
    QuickaskPage,
    TranslatorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuDataProvider,
    LanguageDataProvider,
    TranslateDataProvider,
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// export function createTranslateLoader(http: Http) {
//   return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
// }

