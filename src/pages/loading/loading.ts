import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../home/home';
/* 

The loading page for the app

TODO: add language compatability .
*/ 


@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

	// Native language of the user
	nativeLanguage: string;

	constructor(public navCtrl: NavController, private globalization: Globalization, public translate: TranslateService) {
		this.nativeLanguage = "en";

		// Standin for when server is fetching data 
		setTimeout(() => console.log("fetch_call"), 200);

		setTimeout(() => this.navCtrl.push(HomePage, { value: this.nativeLanguage, error: false }), 2000);
	}

	ionViewDidLoad() {
		console.log("[Loading Page] - Loaded");

		// Retrieve and then set the native language of the user.
	  	console.log("Attempting to retrieve Native Language...");
	  	this.globalization.getPreferredLanguage()
	  	.then(res => {
	  		console.log("Language Found! - " + res.value); 
	  		this.setLanguage("en");
	  		this.translate.setDefaultLang('en');
	  	})
	  	.catch(e => { console.log("Error - " + e); this.setLanguage("en");this.translate.setDefaultLang('en'); } );
    }

    setLanguage(language: string) {
    	this.nativeLanguage = "en";
    }

}
