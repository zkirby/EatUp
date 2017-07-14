import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageDataProvider {

  serverLang: string = "English";
  userLang: string = "English";
  languageList: object[];

  code_name: object;
  name_code: object;

  constructor(public http: Http) {
  }

  getRemoteData() {

    return this.http.get("https://kamusi.org/api/languages")
                    .map(res => { return res.json() });
  }

  setObject(type: string, value: object) {
    if (type === "codes") {
      this.code_name = value;
    } else if (type === "name") {
      this.name_code = value;
    }
  }

  getCode(name: string) {
    return this.name_code[name];
  }

  getName(code: string) {
    return this.code_name[code];
  }

  setLanguages(value: object[]) {
    this.languageList = value;
  }

  getLanguages() {
    return this.languageList;
  }

  set(type: string, value: string) {
    if (type === "server") {
      this.serverLang = value;
    } else if (type === "user") {
      this.userLang = value;
    }
  }

  get(type: string) {
    if (type === "server") {
      return this.serverLang;
    } else if (type === "user") {
      return this.userLang;
    }
  }

}
