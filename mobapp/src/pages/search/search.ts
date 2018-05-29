import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items: any[] = [];
  loading :boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private searchProvider: SearchProvider) {
    searchProvider.performGetRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
