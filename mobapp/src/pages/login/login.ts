import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showLogin:boolean = true;
  username:string = 'ddd';
  password:string = 'dd';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  loginPush(){
    if(this.username === '' || this.password === '' ){
      let alert = this.alertCtrl.create({
        title:'Feil',
        subTitle:'Skriv inn riktig brukernavn og passord',
        buttons:['Ok']
      });
      alert.present();
    } else {
      this.navCtrl.push('WelcomePage');
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
