import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loginPush(){
    this.navCtrl.push('WelcomePage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
