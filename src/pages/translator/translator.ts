import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanguageDataProvider } from '../../providers/language-data/language-data';
import { TranslateDataProvider } from '../../providers/translate-data/translate-data';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public languageService: LanguageDataProvider, public translateService: TranslateDataProvider) {

  	this.userLang = this.languageService.getName(this.languageService.get("user"));
  	this.serverLang = this.languageService.getName(this.languageService.get("server"));
  	this.responseTerm = "null";

    console.log(this.languageService.get("user"))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorPage');
  }

  askForTerm() {
  	this.translateService.getRemoteData(this.termToTranslate).subscribe((data) => {
  		let repsonseData = data[0]['target_terms'];
      if (repsonseData == undefined || repsonseData.length == 0) {
        this.responseTerm = "Couldn't find that word :("
      } else {
        let tempString = ""
        for (let term of repsonseData) {
          tempString += term['lemma'] + ", ";
        }
        this.responseTerm = tempString.slice(0, tempString.length - 2);
      }
  	}, (err) => {
  		this.responseTerm = "Couldn't find the word :(";
  	})
  }

}
