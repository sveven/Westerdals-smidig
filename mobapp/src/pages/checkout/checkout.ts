import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  entireWeek: JSON[];
  meals: JSON[];
  products: JSON[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.getAllProductsFromWeek();
  }

  getAllProductsFromWeek() {
    this.databaseProvider.getAllProductsInWeek(this.databaseProvider.getWeekId()).then((res:any) => {
      this.entireWeek = res;
    });
  }


}
