import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanguageDataProvider } from '../../providers/language-data/language-data';

/**
 * Generated class for the TranslatorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-translator',
  templateUrl: 'translator.html',
})
export class TranslatorPage {

  userLang: string;
  serverLang: string;
  termToTranslate: string;
  responseTerm: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public languageService: LanguageDataProvider) {

  	this.userLang = this.languageService.getName(this.languageService.get("user"));
  	this.serverLang = this.languageService.getName(this.languageService.get("server"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorPage');
  }

  askForTerm() {

  }

}
