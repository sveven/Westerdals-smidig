import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as config from "./../../app/env-example";


@Injectable()
export class SearchProvider {
  constructor(public http: HttpClient) {}

  options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": config.username,
      "X-Client-Token": config.token
    }
  };

  searchForProduct(searchWord: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get( `https://kolonial.no/api/v1/search/?q=${searchWord}/`)
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

  searchForRecipeById(recipeId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get( `https://kolonial.no/api/v1/recipes/${recipeId}/`)
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
