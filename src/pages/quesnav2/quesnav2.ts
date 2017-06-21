import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AboutPage } from '../about/about';

/**
 * Generated class for the Quesnav2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quesnav2',
  templateUrl: 'quesnav2.html',
})
export class Quesnav2Page {

  decisionTree: object;
  headerLinkedList: object;
  orderObject: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.orderObject = this.makeOrderObject();
  	this.decisionTree = this.makeDecisionTree();
    this.headerLinkedList = this.makeHeaderLinkedList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Quesnav2Page');
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
  		console.log("leaf");
  	} else {
  		this.decisionTree = item;
  		console.log(this.decisionTree);
  		this.headerLinkedList = this.headerLinkedList['next'];
  	}


  }

  processStage(tree:object, stage:string) {
  	for (let food of tree['children']) {
  		food['disabled'] = !this.orderObject[stage][food.root.toLowerCase()];
  	}
  }

  stageNext() {
  	this.decisionTree = this.decisionTree['nextStage'];
  	let currentStage = this.headerLinkedList['stage'];
  	this.headerLinkedList = this.headerLinkedList['next'];

  	// Update which buttons are active 
  	this.processStage(this.decisionTree, currentStage);
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
      stage: "stag1",
      next: {
        first: "This restaurant has...",
        stage: "stage2",
        next: {
          first: "This restaurant has...",
          stage: "stage3",
          next: {
          	first: "I would like something with...",
          	stage: "stage4",
          	next: {}
          }
        }
      }
    }
  }

  makeDecisionTree() {
    return {
    	root: "root",
    	checkbox: false,
    	children: [
    		{
    			root: "An Entree",
    			checkbox: true,
    			children: [
    				{
    					root: "Pizza",
    					checkbox: true,
    					disabled: false
    				}, 
    				{
    					root: "Pasta",
    					checkbox: true,
    					disabled: false
    				},
    				{
    					root: "Soup",
    					checkbox: true,
    					disabled: false
    				}
    			],
    			nextStage: {
    				checkbox: true,
    				children: [
					{
    					root: "Pizza",
    					checkbox: true,
    					disabled: false,
    				}, 
    				{
    					root: "Pasta",
    					checkbox: true,
    					disabled: false,
    				},
    				{
    					root: "Soup",
    					checkbox: true,
    					disabled: false,
    				}
    				]
    			}
    		},
    		{
    			root: "A Drink",
    			checkbox: true,
    			children: []
    		}
    	]
    };
  }

  makeOrderObject() {
  	return {
  		stage1: {
  			entree: false,
  			drink: false
  		},
  		stage2: {
  			chicken: false,
  			pasta: false,
  			pizza: false,
  		},
  		stage3: {
  			chicken: false,
  			pasta: false,
  			pizza: false
  		}
  	};
  }

}
