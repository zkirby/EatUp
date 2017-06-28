import { AboutPage } from '../about/about';
import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { MenuDataProvider } from '../../providers/menu-data/menu-data';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { QuesnavPage } from '../quesnav/quesnav';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuDataProvider, public translate: TranslateService) {
  	this.restVal = "";
    this.translate.setDefaultLang('en');

    if (this.navParams.get("error")) {
      
      this.navCtrl.push(QuesnavPage, { value: "", error: false});

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
                                        this.navCtrl.push(QuesnavPage, { value: "couldn't find that menu :(", error: true });
                                      } else {
                                       this.navCtrl.push(destination, { value: data[0], error: false });
                                      }
                                  }, (err) => this.navCtrl.push(QuesnavPage, { value: "couldn't find that menu :(", error: true }));

  	} else if (decision == "q") {

  		destination = QuesnavPage;
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

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
