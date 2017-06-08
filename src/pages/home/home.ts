import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { MenuDataProvider } from '../../providers/menu-data/menu-data';

/*
	Main navigation page for the app
	will allow the user to select either a menu
	or ask about an item.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	restVal: string;
	itemVal: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuDataProvider) {
  	this.restVal = "";
  	this.itemVal = "";

    console.log("Recieved language: " + this.navParams.get("language"));
  }

  // I've left the decision as a string for right now 
  // in case we want to come back and add more directions from 
  // the home screen.
  grabValue(decision: string) {
  	let destination: any;
  	let params: any;

  	if (decision == "r") {
  		destination = MenuPage;
  		params = this.getMenu(this.restVal, this.navParams.get("language"));
      params = this.formatMenu(params);

    // Will probably remove the ItemPage, but leave it as is
    // incase of any future use.
  	} else if (decision == "i") {
  		destination = ItemPage;
  		params = { value: this.itemVal };
  	}

    //params["language"] = this.navParams["language"];

  	console.log("moving pages... ");

  	setTimeout(() => this.navCtrl.push(destination, params), 2000);
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  getMenu(menu: string, language: string) {

    console.log("Sending name: " + this.restVal)
    return this.menuService.getRemoteData(menu, language);
  }

  formatMenu(obj: any) {
    return obj;
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
