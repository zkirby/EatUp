import { AboutPage } from '../about/about';
import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { MenuDataProvider } from '../../providers/menu-data/menu-data';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Quesnav2Page } from '../quesnav2/quesnav2';
import { QuickaskPage } from '../quickask/quickask';

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
  stage: number;
  button1Text: string;
  button2Text: string;
  button3Text: string;
  labelText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuDataProvider, public translate: TranslateService) {
  	
    // Set staging 
    this.restVal = "";
    this.stage = 0;

    // Set initial stage button names 
    this.button1Text = "FIND RESTAURANT";
    this.button2Text = "ORDER";
    this.button3Text = "CHAT"; // Doesn't matter 
    this.labelText = "FIND RESTAURANT"; // Doesn't matter 

    // Set default lan to english 
    this.translate.setDefaultLang('en');

    if (this.navParams.get("error")) {
      
      this.navCtrl.push(Quesnav2Page, { value: "", error: false});

    } else {

      this.userLang = this.navParams.get("value");
      this.translate.use(this.userLang);
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
                                        this.navCtrl.push(Quesnav2Page, { value: "couldn't find that menu :(", error: true });
                                      } else {
                                       this.navCtrl.push(destination, { value: data[0], error: false });
                                      }
                                  }, (err) => this.navCtrl.push(Quesnav2Page, { value: "couldn't find that menu :(", error: true }));

  	} else if (decision == "q") {

  		destination = Quesnav2Page;
  		params = { value: "", error: false };
      this.navCtrl.push(destination, params);

  	} else if (decision == "q2") {

      destination = Quesnav2Page;
      params = { value: "", error: false };
      this.navCtrl.push(destination, params);

    } else if (decision == "a") {

      destination = QuickaskPage;
      params = { value: "", error: false };
      this.navCtrl.push(destination, params);

    }
  }

  nextStage(direction: string) {

    if (direction === "rest") {
      this.stage += 1;
      this.button2Text = "BY LOCATION";
      this.button1Text = "BY NAME";
    }

  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
