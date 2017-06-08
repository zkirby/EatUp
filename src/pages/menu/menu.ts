import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

	categories: object[];
	items: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.categories = this.sampleDataCat();
  	this.items = this.sampleDataItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  flipCard() {
    console.log("card flipped");
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  sampleDataCat() {
  	return [
  		{ name: "drinks" }, 
  		{ name: "entrees" }, 
  		{ name: "sides" },
  		{ name: "pastas" },
  		{ name: "appetizers" }
  	];
  }

  sampleDataItem() {
  	return [
  		{ name: "Pinot Grigio", subcontent: "Pairings: 1. Chicken Marsala, 2. Shrimp Scampi" },
  		{ name: "Ginger Cream Soda", subcontent: "ginger, lemon, lime agave nectar creama" },
  		{ name: "House Wine", subcontent: "not visable" } 
  	];
  }

}
