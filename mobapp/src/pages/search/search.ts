import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  search: string = "Zalo";
  products: any = [];
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchProvider: SearchProvider
  ) {}

  performSearch(searchWord: string) {
    this.searchProvider
      .searchForProduct(searchWord)
      .then((res: any) => {
        this.products.push(res.products);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
