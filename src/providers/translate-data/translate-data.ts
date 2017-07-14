import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LanguageDataProvider } from '../../providers/language-data/language-data';
import 'rxjs/add/operator/map';

/*
  Generated class for the TranslateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TranslateDataProvider {

  constructor(public http: Http, public languageService: LanguageDataProvider) {
  }

  getRemoteData(toTranslate: string) {
  	return this.http.get("https://kamusi.org/preD/termTranslate/" + toTranslate + "/" + this.languageService.get("user") + "/" + this.languageService.get("server"))
                    .map(res => { return res.json() });
  }

}
