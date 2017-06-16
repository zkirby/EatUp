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

  returnData: object[];

  constructor(public http: Http) {
  }

  getRemoteData(name: string, language: string) {

    name = this.formatMenuName(name);
    return this.http.get("http://localhost:3000/submit/" + name + "-" + language)
                    .map(res => { return res.json() });
  }

  formatMenuName(name: string) {
  	return name.toLowerCase();
  }

}
