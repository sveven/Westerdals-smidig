import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchProvider } from "../../providers/search/search";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  search: any[] = [];
  loading: boolean;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchProvider: SearchProvider
  ) {}

  

  performSearch(searchWord: string) {
    this.loading = true;
    this.searchProvider
      .searchForProduct(searchWord)
      .then((res: any) => {
         this.loading = false;
        (this.search = res.products)})
      .catch(err => console.log(err));
  }
}
