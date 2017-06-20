import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { AboutPage } from '../about/about';


/**
 * Generated class for the QuesnavPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quesnav',
  templateUrl: 'quesnav.html',
})
export class QuesnavPage {

  decisionTree: object;
  headerLinkedList: object;
  hideOrderButtons: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    if (this.navParams.get("error")) {

      let toast = this.toastCtrl.create({
      message: this.navParams.get("value"),
      duration: 2000,
      position: 'top'
      });
      toast.present();

    }

    this.decisionTree = this.makeDecisionTree();
    this.headerLinkedList = this.makeHeaderLinkedList();
    this.hideOrderButtons = true;

  }

  ionViewDidLoad() {
    console.log('[Quesnav Page] loaded');
  }

  goHome() {
  	this.navCtrl.pop();
  }

  getHelpPage() {
  	this.navCtrl.push(AboutPage, { value: "", error: false });
  }

  getChildren(item:object) {
    return item['children'];
  }

  getFirst(item:object) {
    return item["first"];
  }

  changeTree(item:object) {
    if (this.getChildren(item).length == 0) {
      console.log("Leaf");
    } else {
      this.decisionTree = item;
      this.headerLinkedList = this.headerLinkedList['next'];

      if (this.getChildren(this.getChildren(item)[0]).length == 0) {
        this.hideOrderButtons = false;
      } else {
        this.hideOrderButtons = true;
      }
    }
  }

  askOrder(name:string) {

    let alert = this.alertCtrl.create({
      title: 'Pass to Waiter/Waitress',
      subTitle: 'I would like to order ' + name,
      buttons: ['OK']
    });

    alert.present();

  }

  makeHeaderLinkedList() {
    return {
      first: "I'm in the mood for...",
      next: {
        first: "I would likes some...",
        next: {
          first: "I want to order...",
          next: {}
        }
      }
    }
  }

  makeDecisionTree() {
    return {
      root: "root",
      children: [
       {
         root: "An Entree",
         children: [
           {
             root: "Pasta",
             children: [
               {
                 root: "Angle hair",
                 children: []
               },
               {
                 root: "House Pasta",
                 children: []
               }
             ]
           },
           {
             root: "Pizza",
             children: [
               {
                 root: "New York Style",
                 children: []
               },
               {
                 root: "Chicago Deep dish",
                 children: []
               },
               {
                 root: "Thin Crust",
                 children: []
               }
             ]
           },
           {
             root: "Chicken",
             children: [
               {
                 root: "Chicken Strips",
                 children: []
               },
               {
                 root: "Chicken Tenders",
                 children: []
               },
             ]
           },
           {
             root: "Soup",
             children: [
               {
                 root: "Tomato",
                 children: []
               },
               {
                 root: "Basil",
                 children: []
               },
               {
                 root: "Herb",
                 children: []
               },
               {
                 root: "Chicken",
                 children: []
               },
             ]
           }
         ]
       },
       {
         root: "A Drink",
         children: [

         ]
       }
      ]
    }
  }
}
