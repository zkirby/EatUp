import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanguageDataProvider } from '../../providers/language-data/language-data';
import { TranslateDataProvider } from '../../providers/translate-data/translate-data';
import { AboutPage } from '../about/about';

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

    console.log(this.languageService.get("user"))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorPage');
  }

  askForTerm() {
    this.serverLang = this.languageService.getName(this.languageService.get("server"));

  	this.translateService.getRemoteData(this.termToTranslate).subscribe((data) => {
  		let repsonseData = data[0];
      console.log(repsonseData);

      if (repsonseData == undefined || repsonseData["target_terms"].length == 0) {
        this.responseTerm = "Couldn't find that word :("
      } else {
        let tempString = ""
        for (let term of repsonseData["target_terms"]) {
          tempString += term['lemma'].split("_").join(" ") + ", ";
        }
        this.responseTerm = tempString.slice(0, tempString.length - 2);
      }
  	}, (err) => {
  		this.responseTerm = "Couldn't find the word :(";
  	})
  }

  goHome() {
    this.navCtrl.pop();
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

}
