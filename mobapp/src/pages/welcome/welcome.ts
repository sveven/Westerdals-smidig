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
      image: "assets/imgs/LogoKolonial.png",
    },
    {
      title: 'Her kan du:',
      description: 'Søke opp varer',
      image: "assets/imgs/search.png",
    },
    {
      title: 'Og...',
      description: 'Scanne koder fra oppskriftsheftet',
      image: "assets/imgs/photo-camera.png",
    },
    {
      title: "Og...",
      description: "Velge hvilken uke du skal planlegge",
      image: "assets/imgs/calendar.png"
    },
    {
      title: 'Deretter..',
      description: 'Legg til i oversikten din',
      image: "assets/imgs/shopping-cart.png",
    }
   
  ]



  goToTabPage(){
    this.navCtrl.push('BottomTabPage');
  }


}
