import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';

import { HomePage } from '../home/home';
/* 

The loading page for the app

TODO: add loading features, i.e. load data for translation from 
the remote kamusi server.
*/ 


@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

	// Native language of the user
	nativeLanguage: string;

	constructor(public navCtrl: NavController, private globalization: Globalization) {
		this.nativeLanguage = "en";

		// Standin for when server is fetching data 
		setTimeout(() => console.log("fetch_call"), 2000);

		setTimeout(() => this.navCtrl.push(HomePage, { "language": this.nativeLanguage }), 4000);
	}

	ionViewDidLoad() {
		console.log("[Loading Page] - Loaded");

		// Retrieve and then set the native language of the user.
	  	console.log("Attempting to retrieve Native Language...");
	  	this.globalization.getPreferredLanguage()
	  	.then(res => {
	  		console.log("Language Found! - " + res.value); 
	  		this.setLanguage("en");
	  	})
	  	.catch(e => { console.log("Error - " + e); this.setLanguage("en"); } );
    }

    setLanguage(language: string) {
    	this.nativeLanguage = "en";
    }

}
