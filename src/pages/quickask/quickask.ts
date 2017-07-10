import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the QuickaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quickask',
  templateUrl: 'quickask.html',
})
export class QuickaskPage {

	askItems: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public translate: TranslateService) {

  	this.askItems = this.makeAskItems();
  }

  ionViewDidLoad() {
    console.log('[Quick Ask Page] - Loaded');
  }

  goHome() {
  	this.navCtrl.pop();
  }

  getHelpPage() {
  	this.navCtrl.push(AboutPage);
  }

  orderOrMove(item:object) {

    if (this.isLeaf(item)) {

      this.translate.get(item['root']).subscribe(
      value => {
            let alert = this.alertCtrl.create({
              title: "could I please have " + value,
              buttons: ['OK']
            });

            alert.present();
          }
        )

    } else {
      item['prev'] = this.askItems;
      item['hit'] = true;
      setTimeout(()=> this.askItems = item, 200);
    }

  }

  isLeaf(item: object):boolean {
    return this.getChildren(item) == 0;
  }

  getChildren(item:object) {
    return item['children'];
  }

  goBack() {
    if (!(this.askItems['root'] == "root")) {

      // since we're going back, undo the hit
      this.askItems['hit'] = false;
      // set the new ask item to the previous ask items
      this.askItems = this.askItems['prev'];
    }
  }

  notRoot() {
    return !(this.askItems['root'] == "root");
  }

  makeAskItems():object {
    return {
      root: "root",
      children: [
            {
            root: "SOME UTENSILS",
            hit: false,
            show: ()=>{setTimeout(()=>(false),1000)},
            children: [
            {
              root: "A SPOON",
              hit: false,
              show: ()=>{setTimeout(()=>(false),1000)},
              children: []
            },
            {
              root: "CHOPSTICKS",
              hit: false,
              show: ()=>{setTimeout(()=>(false),1000)},
              children: []
            },
            {
              root: "A KNIFE",
              hit: false,
              show: ()=>{setTimeout(()=>(false),1000)},
              children: []
            },
            {
              root: "A FORK",
              hit: false,
              show: ()=>{setTimeout(()=>(false),1000)},
              children: []
            }
          ]
        },
        {
          root: "SOME MORE..",
          show: ()=>{setTimeout(()=>(true),2000)},
          hit: false,
          children: [
          {
            root: "KETCHUP",
            hit: false,
            show: ()=>{setTimeout(()=>(false),1000)},
            children: []
          },
          {
            root: "MILK",
            hit: false,
            show: ()=>{setTimeout(()=>(false),1000)},
            children: []
          },
          {
            root: "WATER",
            hit: false,
            show: ()=>{setTimeout(()=>(false),1000)},
            children: []
          },
          {
            root: "CREAMER",
            hit: false,
            show: ()=>{setTimeout(()=>(false),1000)},
            children: []
          }
          ]
        },
        {
          root: "THE BILL",
          show: ()=>{setTimeout(()=>(true),3000)},
          children: []
        }
      ]
    }
  }

}
