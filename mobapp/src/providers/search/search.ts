import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "../.../../../../../webapp/config.js";

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class SearchProvider {
  constructor(public http: HttpClient) {
  }

  performGetRequest() {
    console.log("In Request");

    return new Promise((resolve, reject) => {
      this.http
        .get("https://kolonial.no/api/v1/products/9329/", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": config.secretusername,
            "X-Client-Token": config.secrettoken
          }
        })
        .subscribe(
          response => {
            console.log(response);

            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
