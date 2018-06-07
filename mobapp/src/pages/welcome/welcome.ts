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
<<<<<<< HEAD
      image: "assets/icons/LogoKolonial.png",
=======
      image: "assets/imgs/LogoKolonial.png",
>>>>>>> 40b13bf250c569ecfd51ea94b1f46c5665efef93
    },
    {
      title: 'Her kan du:',
      description: 'Søke opp varer',
<<<<<<< HEAD
      image: "assets/icons/search.png",
=======
      image: "assets/imgs/search.png",
>>>>>>> 40b13bf250c569ecfd51ea94b1f46c5665efef93
    },
    {
      title: 'Og...',
      description: 'Scanne koder fra oppskriftsheftet',
<<<<<<< HEAD
      image: "assets/icons/photo-camera.png",
=======
      image: "assets/imgs/photo-camera.png",
>>>>>>> 40b13bf250c569ecfd51ea94b1f46c5665efef93
    },
    {
      title: 'Deretter..',
      description: 'Legg til i oversikten din',
<<<<<<< HEAD
      image: "assets/icons/shopping-cart.png",
=======
      image: "assets/imgs/shopping-cart.png",
>>>>>>> 40b13bf250c569ecfd51ea94b1f46c5665efef93
    },
  ]



  goToTabPage(){
    this.navCtrl.push('BottomTabPage');
  }


}
