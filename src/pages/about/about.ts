import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageDataProvider } from '../../providers/language-data/language-data';
import { TestPage } from '../test/test';


/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  languageSupported: object[];
  language: string;
  languageServer: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, public languageService: LanguageDataProvider) {

    this.language = this.languageService.get("user");
    this.languageServer = this.languageService.get("server");
    this.languageSupported = this.languageService.getLanguages();
  }

  changeLang() {
    this.translate.use(this.language);
    this.languageService.set("user", this.language);
  }

  changeLangServer() {
    this.languageService.set("server", this.languageServer);
  }

  ionViewDidLoad() {
    console.log('[About Page] loaded');
  }

  goBack() {
  	this.navCtrl.pop();
  }

  goTestScreen() {
    this.navCtrl.push(TestPage);
  }

}
