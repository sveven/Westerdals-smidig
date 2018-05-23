import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  loginUser(){
    this.navCtrl.push('LoginPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizePage');
  }

}
