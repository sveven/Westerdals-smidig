import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';




@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  option: BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodescanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  scannBar(){
    this.option = {
      preferFrontCamera: true,
    }
    this.barcodescanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
