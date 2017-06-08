import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MenuDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuDataProvider {

  constructor(public http: Http) {
  }

  getRemoteData(name: string, language: string) {
  	console.log("Recieved name and language, sending to server")
  	let na = this.formatMenuName(name);
  	this.http.get("http://localhost:3000/submit/" + na + "-" + language).subscribe(
  		(data) => {
  			console.log("data");
  		}
  	);
  }

  formatMenuName(name: string) {
  	console.log("Formatting name first")
  	return name.toLowerCase();
  }

}
