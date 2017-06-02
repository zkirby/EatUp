import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/* 

The loading page for the app

TODO: add loading features, i.e. load data for translation from 
the remote kamusi server.
*/ 


@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
  	console.log("Loading Page... loaded.");
  }

}
