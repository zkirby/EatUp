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
  passToMe: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.orderObject = this.makeOrderObject();
  	this.decisionTree = this.makeDecisionTree();
    this.headerLinkedList = this.makeHeaderLinkedList();
    this.passToMe = false;

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
    return item['first'];
  }

  changeTree(item:object) {

    item['clicked'] = true;
    setTimeout(()=> {
      if (this.getChildren(item).length == 0) {
          console.log("leaf");
      } else {
          this.decisionTree = item;
          let passOrder = this.headerLinkedList['pass'];
          this.headerLinkedList = this.headerLinkedList['next'];

          if (passOrder) {
            this.askOrder();
          }
        }
    },150)
  	
  }

  processStage(tree:object, stage:string) {
  	for (let food of tree['children']) {
  		food['disabled'] = !this.orderObject[stage][food.root.toLowerCase()];
  	}
  }

  stageNext() {
  	this.decisionTree = this.decisionTree['nextStage'];
  	let currentStage = this.headerLinkedList['stage'];
  	let passOrder = this.headerLinkedList['pass'];
  	this.headerLinkedList = this.headerLinkedList['next'];

  	// Update which buttons are active 
  	this.processStage(this.decisionTree, currentStage);

  	if (passOrder) {
  		this.askOrder();
  	}
  }

  askOrder() {

    let alert = this.alertCtrl.create({
      title: this.passToMe ? "Pass to customer" : "Pass to Waiter/Watrees",
      buttons: ['OK']
    });

    this.passToMe = !this.passToMe;
    alert.present();

  }

  orderItem(name:string) {
  	let alert = this.alertCtrl.create({
      title: "Pass to Waiter/Watrees",
      subTitle: 'I would like to order ' + name,
      buttons: ['OK']
    });

    alert.present();
  }

  makeHeaderLinkedList() {
    return {
      first: "I'm in the mood for...",
      stage: "stag1",
      pass: true,
      next: {
        first: "This restaurant has...",
        stage: "stage2",
        pass: true,
        next: {
          first: "I would like to order...",
          stage: "stage3",
          pass: false,
          next: {
          	first: "I would like...",
          	stage: "stage4",
          	pass: false,
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
    	isLeaf: false,
      clicked: false,
    	children: [
        {
          root: "An Appetizer",
          checkbox: true,
          isLeaf: false,
          disabled: false, 
          clicked: false,
          children: [],
          subchildren: [" "]
        },
    		{
    			root: "An Entree",
    			checkbox: true,
    			isLeaf: false,
          clicked: false,
    			disabled: false,
    			children: [
    				{
    					root: "Pizza",
    					checkbox: true,
    					isLeaf: false,
              clicked: false,
    					disabled: false,
    					subchildren: [" "]
    				}, 
    				{
    					root: "Pasta",
    					checkbox: true,
    					isLeaf: false,
              clicked: false,
    					disabled: false,
    					subchildren: [" "]
    				},
    				{
    					root: "Soup",
    					checkbox: true,
    					isLeaf: false,
              clicked: false,
    					disabled: false,
    					subchildren: [" "]
    				}
    			],
    			subchildren: [" "],
    			nextStage: {
    				checkbox: true,
    				isLeaf: false,
            clicked: false,
    				children: [
					{
    					root: "Pizza",
    					isLeaf: false,
    					checkbox: false,
              clicked: false,
    					disabled: false
    				}, 
    				{
    					root: "Pasta",
    					checkbox: false,
    					isLeaf: false,
              clicked: false,
    					disabled: false
    				},
    				{
    					root: "Soup",
    					checkbox: false,
    					isLeaf: false,
              clicked: false,
    					disabled: false
    				}
    				],
    				nextStage: {
	    				checkbox: false,
	    				isLeaf: false,
              clicked: false,
	    				children: [
	    					{
	    						root: "Pizza",
	    						isLeaf: true,
	    						checkbox: false,
                  clicked: false,
	    						disabled: false,
	    						children: [],
	    						subchildren: [
	    							"with just cheese", "with pepperoni", "with olives"
	    						]
	    					}, 
	    					{
	    						root: "Pasta",
	    						isLeaf: true,
	    						checkbox: false,
                  clicked: false,
	    						disabled: false,
	    						children: [],
	    						subchildren: [
	    							"with marinara sauce", "with red sauce"
	    						]
	    					},
	    					{
	    						root: "Soup",
	    						isLeaf: true,
	    						checkbox: false,
                  clicked: false,
	    						disabled: false,
	    						children: [],
	    						subchildren: [
	    							"with chicken", "with tomatoes"
	    						]
	    					}
	    				]
    				}
    			},

    		},
    		{
    			root: "A Drink",
    			checkbox: true,
    			isLeaf: false,
          clicked: false,
    			children: [],
    			subchildren: [" "],
    			disabled: false
    		},
        {
          root: "A Dessert",
          checkbox: true,
          isLeaf: false,
          clicked: false,
          children: [],
          subchildren: [" "],
          disabled: false
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
  			pizza: false
  		},
  		stage3: {
  			chicken: false,
  			pasta: false,
  			pizza: false
  		}
  	};
  }

}
