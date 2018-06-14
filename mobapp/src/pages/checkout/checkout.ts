import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { SearchProvider } from "../../providers/search/search";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  entireWeek: any = {};
  meals: any[] = [];
  products: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private searchProvider: SearchProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ionViewDidEnter() {
    this.updateAllInformationForWeek();
  }

  updateAllInformationForWeek() {
    this.getAllInformationForWeek().then((res: any) => {
      this.entireWeek = this.formatJsonObjectForWeekOverview(res);

      this.meals = this.removeUndefinedFromMeal(this.entireWeek.Meals);
      this.products = this.entireWeek.Products;
      this.meals = this.addExpandedTagToAllMeals(this.meals);
    });
  }

  expandMeal(mealToExpand): void {
    for (let obj in this.meals) {
      if (this.meals[obj].meal.RecipeId === mealToExpand.meal.RecipeId) {
        this.meals[obj].expanded = !this.meals[obj].expanded;
      }
    }
  }

  deleteMealAndUpdate(mealId: number, mealName: string) {
    this.deleteMeal(mealId).then(() => {
      this.updateAllInformationForWeek();
      let message = mealName + " ble fjernet fra oversikten!"
      this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: "top"
      }).present();
    });

  }

  deleteProductAndUpdate(productId: number, productName: string) {
    this.deleteProduct(productId).then(() => {
      this.updateAllInformationForWeek();
    });
    let message = productName + " ble fjernet fra oversikten!"
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    }).present();
  }

  deleteProduct(productId: number) {
    return this.databaseProvider.dropAllProductsOfIdInWeekFromDatabase(
      productId
    );
  }

  deleteMeal(mealId: number) {
    return this.databaseProvider.deleteMealFromDatabase(mealId);
  }

  deleteAllProducts() {
    Promise.all(
      [].concat.apply(
        this.products.map((product: any) => {
          return this.deleteProduct(product.ProductId);
        }),
        this.meals.map((meal: any) => {
          return this.deleteMeal(meal.meal.MealId);
        })
      )
    ).then(() => {
      this.updateAllInformationForWeek();
    });
  }

  getAllInformationForWeek() {
    return this.databaseProvider
      .getAllProductsInWeek(this.databaseProvider.getWeekId())
      .then((res: any) => {
        console.log(res);

        return Promise.all(
          [].concat.apply(
            this.getInformationForAllDays(res.Days),
            this.getAllProductInformationForWeek(res.Products)
          )
        ).then(result => {
          return result;
        });
      });
  }

  getInformationForAllDays(days) {
    return days.map(day => {
      return Promise.all(
        [].concat.apply(
          this.getAllProductInformationForDay(day),
          this.getAllRecipeInformationForDay(day)
        )
      );
    });
  }

  /**
   * This is a promise which will be put in a promise.all()
   */
  getAllRecipeInformationForDay(day) {
    return day.Meals.map(meal => {
      return Promise.all(this.getAllProductInformationForMeal(meal)).then(
        mealProducts => {
          return this.searchProvider
            .getRecipeById(meal.recipeId)
            .then((recipeInformation: any) => {
              
              return {
                Title: recipeInformation.title,
                Image: recipeInformation.feature_image_url,
                RecipeId: recipeInformation.id,
                Products: mealProducts,
                MealId: meal.Id
              };
            });
        }
      );
    });
  }

  /**
   * @param {*} day
   */
  getAllProductInformationForDay(day) {
    return day.Products.map(product => {
      return this.getFormattedInformationOnProduct(
        product.kolonialId,
        product.ProductInDay.productQuantity
      );
    });
  }

  getAllProductInformationForMeal(meal) {
    return meal.Products.map(product => {
      //TODO: Current rounds up to closest upwards integer, due to limitations in database.
      let quantity = Math.ceil(
        meal.portions * product.ProductInMeal.portionQuantity
      );

      return this.getFormattedInformationOnProduct(
        product.kolonialId,
        quantity
      );
    });
  }

  getAllProductInformationForWeek(products) {
    return products.map(product => {
      return this.getFormattedInformationOnProduct(
        product.kolonialId,
        product.ProductInWeek.productQuantity
      );
    });
  }

  getFormattedInformationOnProduct(kolonialId, quantity) {
    return this.searchProvider
      .getInformationOfProduct(kolonialId)
      .then((res: any) => {
        return {
          Name: res.name,
          Name_Extra: res.name_extra,
          Image: res.images[0].thumbnail.url,
          Price: parseInt(res.gross_price),
          Quantity: quantity,
          ProductId: res.id
        };
      })
      .catch(err => {
        console.log("Problemer med produkt: ", err);
      });
  }

  formatJsonObjectForWeekOverview(currentJsonObject) {
    let result = {};
    let meals = [];
    let products = [];

    for (let obj of currentJsonObject) {
      if (obj.hasOwnProperty("ProductId")) {
        products.push(obj);
      }

      for (let item of obj) {
        if (item.hasOwnProperty("ProductId")) {
          products.push(item);
        } else if (item.hasOwnProperty("RecipeId")) {
          meals.push(item);
        }
      }
    }
    result = {
      Meals: meals,
      Products: products
    };

    result = this.removeDuplicatesFromWeekJson(result);
    result["TotalPrice"] = this.calculateTotalPriceForCart(result);

    return result;
  }

  calculateTotalPriceForCart(currentJsonObject) {
    let totalPrice = 0;

    for (let meal of currentJsonObject.Meals) {
      for (let product of meal.Products) {
        if (product !== undefined && product.hasOwnProperty("Price")) {
          totalPrice += product.Price * product.Quantity;
        }
      }
    }
    for (let product of currentJsonObject.Products) {
      if (product !== undefined && product.hasOwnProperty("Price")) {
        totalPrice += product.Price * product.Quantity;
      }
    }
    return totalPrice;
  }

  removeDuplicatesFromWeekJson(currentJsonObject) {
    let resultProducts = [];
    
    for (let product of currentJsonObject.Products) {
      if (resultProducts.length === 0) {
        resultProducts.push(product);
      } else {
        let found = false;
        for (let i in resultProducts) {
          if (resultProducts[i].ProductId === product.ProductId) {
            found = true;
            resultProducts[i].Quantity += product.Quantity;
            
          }
        }

        if (!found && product !== undefined) {
          resultProducts.push(product);
          found = false;
        }
      }
    }

    currentJsonObject.Products = resultProducts;
    return currentJsonObject;
  }

  removeUndefinedFromMeal(meals) {
    let resultMeals = [];

    for (let meal of meals) {
      let newMeal = {
        Image: meal.Image,
        Products: [],
        RecipeId: meal.RecipeId,
        Title: meal.Title, 
        MealId: meal.MealId
      };

      for (let product of meal.Products) {
        if (product !== undefined) {
          newMeal.Products.push(product);
        }
      }
      resultMeals.push(newMeal);
    }
    return resultMeals;
  }

  addExpandedTagToAllMeals(meals) {
    let newMeals = [];
    meals.forEach(meal => {
      newMeals.push(this.addExpandedTagToMeal(meal));
    });
    return newMeals;
  }

  addExpandedTagToMeal(meal) {
    return {
      expanded: false,
      meal: meal
    };
  }

  presentEmptyAlert() {
    let alert = this.alertCtrl.create({
      title: "Tøm",
      subTitle: "Er du sikker på at du vil fjerne ALT som er lagt til?",
      buttons: [
        {
          text: "Avbryt",
          role: "cancel"
        },
        {
          text: "Ok",
          handler: () => {
            this.deleteAllProducts();
          }
        }
      ]
    });
    alert.present();
  }
}
