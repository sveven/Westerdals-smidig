import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as config from "./../../app/env";

@Injectable()
export class SearchProvider {
  constructor(public http: HttpClient) { }

  options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "x-www-form-urlencoded",
      "User-Agent": config.username,
      "X-Client-Token": config.token
    }
  };

  searchForProduct(searchWord: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `https://kolonial.no/api/v1/search/?q=${searchWord}/`, this.options)
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

  getInformationOfProduct(productId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `https://kolonial.no/api/v1/products/${productId}/`, this.options)
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

  getRecipeById(recipeId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://kolonial.no/api/v1/recipes/${recipeId}/`, this.options)
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
