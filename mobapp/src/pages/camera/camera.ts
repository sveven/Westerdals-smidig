import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { SearchProvider } from "../../providers/search/search";




@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  recipes: any =[];
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private barcodescanner: BarcodeScanner, 
              private searchProvider: SearchProvider ) {
  }

  scannQr(){
    this.barcodescanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      if(barcodeData.format == "QR_CODE"){
        barcodeData.text 
      }
     }).catch(err => {
         console.log('Error', err);
     });
    }

    searchQr(recipeId: string) {
      this.searchProvider
        .searchForProduct(recipeId)
        .then((res: any) => {
          this.recipes.push(res.products);
        })
        .catch(err => {
          console.log(err);
        });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  
}
