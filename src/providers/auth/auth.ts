import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
  }

  getRemoteData(user: string, pass: string) {

    return this.http.post("https://kamusi.org/kamusi_auth_me", 
    {
    	username: user,
    	password: pass 
    }).map(res => { return res.json() });
  }

}
