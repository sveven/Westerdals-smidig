import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { AuthorizePage } from '../pages/authorize/authorize';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import { WelcomePage } from '../pages/welcome/welcome';
import { BottomTabPage } from '../pages/bottom-tab/bottom-tab';
import { CameraPage } from '../pages/camera/camera';
import { SearchPage } from '../pages/search/search';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SearchProvider } from '../providers/search/search';
import { DatabaseProvider } from '../providers/database/database';
import { AddRecipePage } from '../pages/add-recipe/add-recipe';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    AuthorizePage,
    AddRecipePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthorizePage,
    AddRecipePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    SearchProvider,
    DatabaseProvider,
    LoginProvider
  ]
})

export class AppModule {}
