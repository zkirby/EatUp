import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

	categories: object[];
	items: object[];
  menu: object[];
  cache: Map<number, object[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public translate: TranslateService) {
    let possibleMenu = this.navParams.get("value");

    if (typeof possibleMenu == "string") {

      this.navCtrl.push(HomePage, this.navParams);

    } else {

      this.menu = possibleMenu.menu;
  	  this.categories = this.getCategories(this.menu);
  	  this.items = this.getMenuItems(this.menu[0]["subsections"]);
      this.cache = new Map();
      
    }
  }

  memoizeItems(index:number, items:object[]) {
    this.cache.set(index, items);
  }

  getCachedItem(index:number) {
    return this.cache.get(index);
  }

  checkCached(index:number) {
    return this.cache.has(index);
  }

  ionViewDidLoad() {
    console.log('[Menu Page] Loaded');
  }

  changeItems(index: number) {
    if (this.checkCached(index)) {
      this.items = this.getCachedItem(index);
    } else {
      this.items = this.getMenuItems(this.menu[index]["subsections"]);
      this.memoizeItems(index, this.items);
    }
  }

  getHelpPage() {
    this.navCtrl.push(AboutPage);
  }

  goHome() {
    this.navCtrl.pop();
  }

  getCategories(menu: object[]) {
    let catreturn = []; let count = 0;
    for (let heading of menu) {
      catreturn.push( { name: heading["name"], index: count} ); 
      count++;
    }
    return catreturn;
  }

  getMenuItems(menu: object[]) {
    let itemreturn = []; 
    let ingreString = ""; 
    let daysArray = [];
    for (let section of menu) {
      for (let food of section["items"]) {
        for (let ing of food["ingredients"]) {
          ingreString += ing["ingredient"] + ", ";
        }
        for (let day of Object.keys(food["day"])) {
          if (food["day"][day]) {
            daysArray.push(day);
          }
        }
        itemreturn.push( 
            { name: food["name"], 
            subcontent: food["description"], 
            flipped: false,
            numPeople: food["nbPeople"],
            ingre: ingreString.slice(0, ingreString.length - 2),
            //days: daysArray,
            mealType: food["meal"] } 
          );
        ingreString = ""; daysArray = [];
      }
    }
    return itemreturn;
  }

  flipCard(item:object) {
    item['flipped'] = !item['flipped'];
  }

  askOrder(item:object) {
    this.flipCard(item);

    let alert = this.alertCtrl.create({
      title: 'Pass to Waiter/Waitress',
      subTitle: 'I would like to order ' + item['name'],
      buttons: ['OK']
    });

    alert.present();

  }

  // Sample Data for Local debugging, if you can run the server 
  // the test menu is called 'dev menu' and should have entree - pasta/pizza and 
  // drinks - water
  sampleDataCat() {
  	return [
  		{ name: "drinks" }, 
  		{ name: "entrees" }, 
  		{ name: "sides" },
  		{ name: "pastas" },
  		{ name: "appetizers" }
  	];
  }

  sampleDataItem() {
  	return [
  		{ name: "Pinot Grigio", subcontent: "Pairings: 1. Chicken Marsala, 2. Shrimp Scampi" },
  		{ name: "Ginger Cream Soda", subcontent: "ginger, lemon, lime agave nectar creama" },
  		{ name: "House Wine", subcontent: "not visable" } 
  	];
  }

}
