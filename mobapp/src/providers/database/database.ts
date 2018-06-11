import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DatabaseProvider {
  private weekId: number;

  private options = {};
  constructor(public http: HttpClient) {}

  setWeekId(weekId: number) {
    this.weekId = weekId;
  }

  getWeekId(): number {
    return this.weekId;
  }

  addProductToDatabase(productId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/product-in-week/${productId}/${
            this.weekId
          }`
        )
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

  addRecipeToDatabase(recipeId: number, portions: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/recipe-in-day/${recipeId}/${
            this.weekId
          }/${portions}`
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

  getWeekIdFromServer(kolonialUserId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/week/${kolonialUserId}/latest`
        )
        .subscribe(
          (response: any) => {
            this.weekId = response.weekId;
            resolve(response.weekId);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getAllProductsInWeek(weekId) {
    this.options = {
      params: new HttpParams().set("weekid", weekId)
    };
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/${weekId}/all`,
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

  getLatestWeekFromServer(kolonialUserId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/week/${kolonialUserId}/latest`
        )
        .subscribe(
          (response: any) => {
            this.weekId = response.weekId;
            resolve(response.weekId);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getAllWeeksFromServer(kolonialUserId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/week/all/${kolonialUserId}`
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  dropAllProductsOfIdInWeekFromDatabase(productId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/delete/${productId}/${
            this.weekId
          }/`
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  dropWeekFromDatabaseAndGetNew(weekId: number, kolonialUserId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/${weekId}/${kolonialUserId}/drop/`
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  deleteMealFromDatabase(mealId: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`http://91.189.170.100:3000/database/mobile/delete/${mealId}/`)
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  changeNameOfWeek(weekId: number, weekName: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `http://91.189.170.100:3000/database/mobile/week/${weekId}/${weekName}/`
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
