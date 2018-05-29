import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { SearchPage } from '../search/search';
import { CheckoutPage } from '../checkout/checkout';



@IonicPage()
@Component({
  selector: 'page-bottom-tab',
  templateUrl: 'bottom-tab.html'
})
export class BottomTabPage {

  searchRoot = 'SearchPage'
  cameraRoot = 'CameraPage'
  checkoutRoot = 'CheckoutPage'


  constructor(public navCtrl: NavController) {}

}
