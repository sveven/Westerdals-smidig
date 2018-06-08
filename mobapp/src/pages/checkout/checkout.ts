import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { SearchProvider } from "../../providers/search/search";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  entireWeek: any = {};
  meals: JSON[] = [];
  products: JSON[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private searchProvider: SearchProvider
  ) { }

  ionViewDidEnter() {
    this.getAllInformationForWeek().then((res: any) => {
      this.entireWeek = this.formatJsonObjectForWeekOverview(res);

      this.meals = this.removeUndefinedFromMeal(this.entireWeek.Meals);
      this.products = this.entireWeek.Products;

      console.log(this.meals);
    });
  }

  getAllInformationForWeek() {
    return this.databaseProvider
      .getAllProductsInWeek(this.databaseProvider.getWeekId())
      .then((res: any) => {

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
                Products: mealProducts
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
        console.log("result ", res);
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
        for (let filteredProduct of resultProducts) {
          if (filteredProduct.ProductId === product.ProductId) {
            found = true;
            filteredProduct.Quantity += product.Quantity;
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
    let resultMeals = []
    console.log("meals before: ", meals);

    for(let meal of meals) {
     let newMeal = {
        Image: meal.Image,
        Products: [],
        RecipeId: meal.RecipeId, 
        Title: meal.Title
      };
      
      for(let product of meal.Products) {
        if(product !== undefined){
          newMeal.Products.push(product);
        }
      }
      resultMeals.push(newMeal);
    }
    console.log("newmeal: ", resultMeals);
    return resultMeals;
  }
}
