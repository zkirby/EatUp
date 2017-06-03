import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { MenuPage } from '../menu/menu';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.restVal = "";
  	this.itemVal = "";
  }

  // I've left the decision as a string for right now 
  // in case we want to come back and add more directions from 
  // the home screen.
  grabValue(decision: string) {
  	let destination: any;
  	let params: object;

  	if (decision == "r") {
  		destination = MenuPage;
  		params = { value: this.restVal };
  	} else if (decision == "i") {
  		destination = ItemPage;
  		params = { value: this.itemVal };
  	}

  	console.log("moving pages... ");

  	setTimeout(() => this.navCtrl.push(destination, params), 2000);
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
