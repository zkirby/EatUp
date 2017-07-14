import { AboutPage } from '../about/about';
import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { MenuDataProvider } from '../../providers/menu-data/menu-data';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Quesnav2Page } from '../quesnav2/quesnav2';
import { QuickaskPage } from '../quickask/quickask';
import { TranslatorPage } from '../translator/translator';
import { LanguageDataProvider } from '../../providers/language-data/language-data';



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
  labelText: string;
  menuObject: object;


  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuDataProvider, public translate: TranslateService, public alertCtrl: AlertController, public languageService: LanguageDataProvider) {
  	
    // Set staging 
    this.restVal = "";
    this.stage = 0;

    // Set initial stage button names 
    this.button1Text = "FIND RESTAURANT";
    this.button2Text = "ORDER";
    this.labelText = "FIND RESTAURANT"; // Doesn't matter 

    this.translate.use(this.languageService.get("user"));

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
                                        //this.navCtrl.push(Quesnav2Page, { value: "couldn't find that menu :(", error: true });
                                        this.finalStage(false, true);
                                        this.menuObject = { value: [], error: false };
                                      } else {
                                       //this.navCtrl.push(destination, { value: data[0], error: false });
                                       this.finalStage(true, false);
                                       this.menuObject = { value: data[0], error: false }
                                      }
                                  }, (err) => { this.finalStage(false, true); this.menuObject = { value: [], error: false } }); //this.navCtrl.push(Quesnav2Page, { value: "couldn't find that menu :(", error: true }));

  	} 
  }

  nextStage(direction: string) {

    if (this.stage == 3) {

      let destination: any;
      let params: any;

      if (direction === "rest") {

        if (this.button1Text == "MENU") {

          destination = MenuPage;
          params = this.menuObject;

        } else if (this.button1Text == "CHAT") {

          destination = Quesnav2Page;
          params = { value: "", error: false };

        }

      } else if (direction == "order") {

        destination = QuickaskPage;
        params = { value: "", error: false }

      }

      this.navCtrl.push(destination, params);

    } else {

      if (direction === "rest") {
        this.stage += 1;
        this.button2Text = "BY LOCATION";
        this.button1Text = "BY NAME";
      } else if (direction === "order") {
        this.stage = 2;
        this.finalStage(false, false);
      }
    }

  }

  finalStage(menu:boolean, error:boolean) {
    this.stage += 1;
    this.button2Text = "QUICK ASK";
    this.labelText = this.languageService.getName(this.languageService.get("server"));

    if (menu) {
      this.button1Text = "MENU";
    } else {
      this.button1Text = "CHAT";
    }

    if (error) {

      let alert = this.alertCtrl.create({
        title: 'Menu Not Found',
        subTitle: "The restaurant you've entered does not have a menu in the Kamusi database, tell them to go to [link] to create a menu entry! Please enter the name of the restaurant below",
        inputs: [
          {
            name: 'Please enter the restaurant name',
            placeholder: 'Name'
          },
        ],
        buttons: ['OK']
      });
      alert.present();

    }

  }

  startOver() {
    this.stage = 0;
    this.button1Text = "FIND RESTAURANT";
    this.button2Text = "ORDER";
    this.labelText = "FIND RESTAURANT";  
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  goToTranslator() {
    this.navCtrl.push(TranslatorPage);
  }

  ionViewDidLoad() {
    console.log('[Home Page] - Loaded');
  }

}
