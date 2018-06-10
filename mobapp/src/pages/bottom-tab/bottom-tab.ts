import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { SearchPage } from '../search/search';
import { CheckoutPage } from '../checkout/checkout';
import { CalendarPage } from '../calendar/calendar';
import { ProfilePage } from '../profile/profile';




@IonicPage()
@Component({
  selector: 'page-bottom-tab',
  templateUrl: 'bottom-tab.html'
})
export class BottomTabPage {

  searchRoot = 'SearchPage'
  cameraRoot = 'CameraPage'
  checkoutRoot = 'CheckoutPage'
  calendarRoot = 'CalendarPage'
  profileRoot = 'ProfilePage'


  constructor(public navCtrl: NavController) {}

}
