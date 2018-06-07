import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";
import { Observable } from "rxjs/Observable";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  search: string = "Ost";
  products: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchProvider: SearchProvider,
    private databaseProvider: DatabaseProvider
  ) {}

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

  addProductToDatabase(productId: number) {
    this.databaseProvider.addProductToDatabase(productId).then((res : any) => {
      console.log(res);
      
    }).catch(err => {
      console.log(err);
      
    })
  }
}
