import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {

    this.languageSupported = this.makeLanguageSupport();
    this.language = "en";
  }

  makeLanguageSupport(): object[] {
    return [
    {
      lang: "English",
      code: "en"
    }, 
    {
      lang: "Spanish",
      code: "es"
    }
    ];
  }

  changeLang() {

    console.log(this.language);
    this.translate.use(this.language);

  }

  ionViewDidLoad() {
    console.log('[About Page] loaded');
  }

  goBack() {
  	this.navCtrl.pop();
  }

}
