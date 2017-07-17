import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { LanguageDataProvider } from '../../providers/language-data/language-data';


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

	constructor(public navCtrl: NavController, private globalization: Globalization, public translate: TranslateService, public languageService: LanguageDataProvider) {
		this.languageService.set("server", "eng_3_1");
		this.languageService.set("user", "eng_3_1");

		setTimeout(() => {

			this.languageService.getRemoteData().subscribe((data) => {

				let langs = data;
				let returnLangs = [];
				let codes_word = {};

				for (let lan of Object.keys(langs)) {
		        	returnLangs.push({
		          		lang: lan.toUpperCase(),
		          		code: langs[lan]
		        	})
		        	codes_word[langs[lan]] = lan;
		     	}

		      	this.languageService.setLanguages(returnLangs);
		      	this.languageService.setObject("name", langs);
		      	this.languageService.setObject("codes", codes_word);
		      	this.navCtrl.push(HomePage);
			}, 
			(err) =>
	    	{ 
	      		let langs = {lang: "ENGLISH", code: "en"};
	      		let langcode = { "English" : "en" };
	      		let codelang = { "en" : "English" };

	      		this.languageService.setLanguages([langs]);
	      		this.languageService.setObject("name", langcode);
		      	this.languageService.setObject("code", codelang);
		      	this.navCtrl.push(HomePage);

	    	});
    	}, 1500);
	}

	ionViewDidLoad() {
		console.log("[Loading Page] - Loaded");

		// Retrieve and then set the native language of the user.
	  	console.log("Attempting to retrieve Native Language...");
	  	this.globalization.getPreferredLanguage()
	  	.then(res => {

	  		console.log("Language Found! - " + res.value); 
	  		this.translate.setDefaultLang('eng_3_1');
	  		//this.languageService.set("user", res.value)

	  	})
	  	.catch(e => { 

	  		console.log("Error - " + e); 
	  		this.languageService.set("user", "eng_3_1");
	  		this.translate.setDefaultLang('eng_3_1'); 

	  	} );
    }

}