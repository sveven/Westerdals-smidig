import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";
import { Observable } from "rxjs/Observable";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  search: string = "";
  products: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchProvider: SearchProvider,
    private databaseProvider: DatabaseProvider,
    private toastCtrl: ToastController) {
    this.performSearch("salat");
  }

  performSearch(searchWord: string) {
    this.products = [];
    this.searchProvider
      .searchForProduct(searchWord)
      .then((res: any) => {
          this.products.push(res.products);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addProductToDatabase(productId: number, itemName: string) {
    this.databaseProvider.addProductToDatabase(productId).then((res: any) => {
      console.log(res);

      let message = itemName + " er blitt lagt til i oversikten din!"
      this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: "top"
      }).present();

    }).catch(err => {
      console.log(err);

    })
  }


}
