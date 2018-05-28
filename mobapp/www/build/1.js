webpackJsonp([1],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */]),
            ],
        })
    ], SearchPageModule);
    return SearchPageModule;
}());

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/antim/PRO200-17-20/mobapp/src/pages/search/search.html"*/'<ion-content class="contento" padding>\n  <ion-searchbar (ionInput)="text" (animated)="true" placeholder="Søk i tusenvis av varer"></ion-searchbar>\n    \n  \n    <ion-grid wrap responsive-lg>\n      <ion-row>\n        <ion-col col-2>\n          <p>bilde</p>\n        </ion-col>\n        <ion-col col-5>\n          <p>beskrivelse</p>\n        </ion-col>\n        <ion-col col-2>\n          <p>pris</p>\n        </ion-col>\n        <ion-col col-1>\n          <button ion-button icon-only clear (click)="add()">\n            <ion-icon name="add-circle"></ion-icon>\n        </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n          <ion-col col-2>\n            <p>bilde</p>\n          </ion-col>\n          <ion-col col-5>\n            <p>beskrivelse</p>\n          </ion-col>\n          <ion-col col-2>\n            <p>pris</p>\n          </ion-col>\n          <ion-col col-1>\n            <button ion-button icon-only clear (click)="add()">\n              <ion-icon name="add-circle"></ion-icon>\n          </button>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col col-2>\n              <p>bilde</p>\n            </ion-col>\n            <ion-col col-5>\n              <p>beskrivelse</p>\n            </ion-col>\n            <ion-col col-2>\n              <p>pris</p>\n            </ion-col>\n            <ion-col col-1>\n              <button ion-button icon-only clear (click)="add()">\n                <ion-icon name="add-circle"></ion-icon>\n            </button>\n            </ion-col>\n          </ion-row>\n\n          <ion-row>\n              <ion-col col-2>\n                <p>bilde</p>\n              </ion-col>\n              <ion-col col-5>\n                <p>beskrivelse</p>\n              </ion-col>\n              <ion-col col-2>\n                <p>pris</p>\n              </ion-col>\n              <ion-col col-1>\n                <button ion-button icon-only clear (click)="add()">\n                  <ion-icon name="add-circle"></ion-icon>\n              </button>\n              </ion-col>\n            </ion-row>\n\n            <ion-row>\n                <ion-col col-2>\n                  <p>bilde</p>\n                </ion-col>\n                <ion-col col-5>\n                  <p>beskrivelse</p>\n                </ion-col>\n                <ion-col col-2>\n                  <p>pris</p>\n                </ion-col>\n                <ion-col col-1>\n                  <button ion-button icon-only clear (click)="add()">\n                    <ion-icon name="add-circle"></ion-icon>\n                </button>\n                </ion-col>\n              </ion-row>\n\n              <ion-row>\n                  <ion-col col-2>\n                    <p>bilde</p>\n                  </ion-col>\n                  <ion-col col-5>\n                    <p>beskrivelse</p>\n                  </ion-col>\n                  <ion-col col-2>\n                    <p>pris</p>\n                  </ion-col>\n                  <ion-col col-1>\n                    <button ion-button icon-only clear (click)="add()">\n                      <ion-icon name="add-circle"></ion-icon>\n                  </button>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col col-2>\n                      <p>bilde</p>\n                    </ion-col>\n                    <ion-col col-5>\n                      <p>beskrivelse</p>\n                    </ion-col>\n                    <ion-col col-2>\n                      <p>pris</p>\n                    </ion-col>\n                    <ion-col col-1>\n                      <button ion-button icon-only clear (click)="add()">\n                        <ion-icon name="add-circle"></ion-icon>\n                    </button>\n                    </ion-col>\n                  </ion-row>\n\n                  <ion-row>\n                      <ion-col col-2>\n                        <p>bilde</p>\n                      </ion-col>\n                      <ion-col col-5>\n                        <p>beskrivelse</p>\n                      </ion-col>\n                      <ion-col col-2>\n                        <p>pris</p>\n                      </ion-col>\n                      <ion-col col-1>\n                        <button ion-button icon-only clear (click)="add()">\n                          <ion-icon name="add-circle"></ion-icon>\n                      </button>\n                      </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col col-2>\n                          <p>bilde</p>\n                        </ion-col>\n                        <ion-col col-5>\n                          <p>beskrivelse</p>\n                        </ion-col>\n                        <ion-col col-2>\n                          <p>pris</p>\n                        </ion-col>\n                        <ion-col col-1>\n                          <button ion-button icon-only clear (click)="add()">\n                            <ion-icon name="add-circle"></ion-icon>\n                        </button>\n                        </ion-col>\n                      </ion-row>\n\n                      <ion-row>\n                          <ion-col col-2>\n                            <p>bilde</p>\n                          </ion-col>\n                          <ion-col col-5>\n                            <p>beskrivelse</p>\n                          </ion-col>\n                          <ion-col col-2>\n                            <p>pris</p>\n                          </ion-col>\n                          <ion-col col-1>\n                            <button ion-button icon-only clear (click)="add()">\n                              <ion-icon name="add-circle"></ion-icon>\n                          </button>\n                          </ion-col>\n                        </ion-row>\n\n                        <ion-row>\n                            <ion-col col-2>\n                              <p>bilde</p>\n                            </ion-col>\n                            <ion-col col-5>\n                              <p>beskrivelse</p>\n                            </ion-col>\n                            <ion-col col-2>\n                              <p>pris</p>\n                            </ion-col>\n                            <ion-col col-1>\n                              <button ion-button icon-only clear (click)="add()">\n                                <ion-icon name="add-circle"></ion-icon>\n                            </button>\n                            </ion-col>\n                          </ion-row>\n\n                          <ion-row>\n                              <ion-col col-2>\n                                <p>bilde</p>\n                              </ion-col>\n                              <ion-col col-5>\n                                <p>beskrivelse</p>\n                              </ion-col>\n                              <ion-col col-2>\n                                <p>pris</p>\n                              </ion-col>\n                              <ion-col col-1>\n                                <button ion-button icon-only clear (click)="add()">\n                                  <ion-icon name="add-circle"></ion-icon>\n                              </button>\n                              </ion-col>\n                            </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/antim/PRO200-17-20/mobapp/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=1.js.map