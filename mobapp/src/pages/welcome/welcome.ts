import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  slider = [
    {
      title: 'Velkommen til Kompanjong',
      description: 'Kompanjong gjør planleggingen av uken enklere og raskere mens du er på farten.',
      image: "assets/icons/LogoKolonial.png",
    },
    {
      title: 'Her kan du:',
      description: 'Søke opp varer',
      image: "assets/icons/search.png",
    },
    {
      title: 'Og...',
      description: 'Scanne koder fra oppskriftsheftet',
      image: "assets/icons/photo-camera.png",
    },
    {
      title: 'Deretter..',
      description: 'Legg til i oversikten din',
      image: "assets/icons/shopping-cart.png",
    },
  ]



  goToTabPage(){
    this.navCtrl.push('BottomTabPage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
