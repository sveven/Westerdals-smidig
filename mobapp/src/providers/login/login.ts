import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as config from "./../../app/env";

@Injectable()
export class LoginProvider {
  options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": config.username,
      "X-Client-Token": config.token
    }
  };

  constructor(public http: HttpClient) {}

  loginToKolonial(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `https://kolonial.no/api/v1/user/login/`,
          { username: username, password: password },
          this.options
        )
        .subscribe(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }

}
