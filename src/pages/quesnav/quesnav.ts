import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    if (this.navParams.get("error")) {

      let toast = this.toastCtrl.create({
      message: this.navParams.get("value"),
      duration: 2000,
      position: 'top'
      });
      toast.present();

    } else {

    }

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
}
