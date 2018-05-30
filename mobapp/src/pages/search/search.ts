import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  items: any[] = [];
  loading: boolean;
  search: string = "TEST";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchProvider: SearchProvider
  ) {}

  performSearch(searchWord: string) {
    this.searchProvider
      .searchForProduct(searchWord)
      .then((res: any) => (this.search = res.products))
      .catch(err => console.log(err));
  }
}
