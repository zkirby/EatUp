import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AuthTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auth-test',
  templateUrl: 'auth-test.html',
})
export class AuthTestPage {

	password: string;
	username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  test_auth() {
  	this.auth.getRemoteData(this.username, this.password).subscribe((data) => {
  		console.log(data)
  	}, (err) => { 
  		console.log("Can't retrieve username/password");
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthTestPage');
  }

}
