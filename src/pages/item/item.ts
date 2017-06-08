import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';

/**
 * Generated class for the ItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

	toTranslate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.toTranslate = this.navParams.get('value');
  }

  getMore() {
  	this.toTranslate = "More to Come!"
  }

  returnHome() {
  	this.navCtrl.pop();
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  ionViewDidLoad() {
    console.log('[Item Page] loaded');
  }

}
