import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { TranslatePoHttpLoader } from '../../node_modules/@biesbjerg/ngx-translate-po-http-loader';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AuthTestPage } from '../pages/auth-test/auth-test';
import { HomePage } from '../pages/home/home';
import { LoadingPage } from '../pages/loading/loading';
import { MenuPage } from '../pages/menu/menu';
import { Quesnav2Page } from '../pages/quesnav2/quesnav2';
import { QuickaskPage } from '../pages/quickask/quickask';
import { TranslatorPage } from '../pages/translator/translator';
import { TestPage } from '../pages/test/test';

import { MenuDataProvider } from '../providers/menu-data/menu-data';
import { LanguageDataProvider } from '../providers/language-data/language-data';
import { TranslateDataProvider } from '../providers/translate-data/translate-data';
import { AuthProvider } from '../providers/auth/auth';


@NgModule({
  declarations: [
    MyApp,
    LoadingPage,
    HomePage, 
    MenuPage,
    AboutPage,
    Quesnav2Page,
    QuickaskPage,
    TranslatorPage,
    TestPage,
    AuthTestPage
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
    TranslatorPage,
    TestPage,
    AuthTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuDataProvider,
    LanguageDataProvider,
    TranslateDataProvider,
    AuthProvider,
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// export function createTranslateLoader(http: Http) {
//   return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
// }

