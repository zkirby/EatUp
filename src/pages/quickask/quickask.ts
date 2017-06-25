import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';

/**
 * Generated class for the QuickaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quickask',
  templateUrl: 'quickask.html',
})
export class QuickaskPage {

	askItems: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  	this.askItems = this.makeAskItems();
  }

  ionViewDidLoad() {
    console.log('[Quick Ask Page] - Loaded');
  }

  goHome() {
  	this.navCtrl.pop();
  }

  getHelpPage() {
  	this.navCtrl.push(AboutPage);
  }

  order(item:string) {

    let alert = this.alertCtrl.create({
      title: "could I please have " + item,
      buttons: ['OK']
    });

    alert.present();

  }

  makeAskItems() {

  	return [
  		"the bill",
  		"a glass of water",
  		"a fork",
  		"some chopsticks",
  		"a knife",
  		"a spoon",
  		"some milk",
  		"some creamer"
  	]

  }

}
