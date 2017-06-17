import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { MenuDataProvider } from '../../providers/menu-data/menu-data';
import { QuesnavPage } from '../quesnav/quesnav';

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
  userLang: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuDataProvider) {
  	this.restVal = "";

    if (this.navParams.get("error")) {
      
      this.navCtrl.push(QuesnavPage, { value: "", error: false});

    } else {

      this.userLang = this.navParams.get("value");
      console.log("Recieved language: " + this.userLang);

    }
  }

  // I've left the decision as a string for right now 
  // in case we want to come back and add more directions from 
  // the home screen.
  grabValue(decision: string) {
  	let destination: any;
  	let params: any;

  	if (decision == "r") {

  		destination = MenuPage;
      
      this.menuService.getRemoteData(this.restVal, this.userLang)
                      .subscribe((data) => { 
                                      if (data.length == 0) {
                                        this.navCtrl.push(QuesnavPage, { value: "couldn't find that menu :(", error: true });
                                      } else {
                                       this.navCtrl.push(destination, { value: data[0], error: false });
                                      }
                                  }, (err) => this.navCtrl.push(QuesnavPage, { value: "couldn't find that menu :(", error: true }));

  	} else if (decision == "q") {

  		destination = QuesnavPage;
  		params = { value: "", error: false };
      this.navCtrl.push(destination, params);

  	}
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
