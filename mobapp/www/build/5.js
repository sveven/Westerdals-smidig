webpackJsonp([5],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BottomTabPageModule", function() { return BottomTabPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bottom_tab__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BottomTabPageModule = /** @class */ (function () {
    function BottomTabPageModule() {
    }
    BottomTabPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bottom_tab__["a" /* BottomTabPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__bottom_tab__["a" /* BottomTabPage */]),
            ]
        })
    ], BottomTabPageModule);
    return BottomTabPageModule;
}());

//# sourceMappingURL=bottom-tab.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottomTabPage; });
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


var BottomTabPage = /** @class */ (function () {
    function BottomTabPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.searchRoot = 'SearchPage';
        this.cameraRoot = 'CameraPage';
        this.checkoutRoot = 'CheckoutPage';
    }
    BottomTabPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bottom-tab',template:/*ion-inline-start:"/Users/antim/PRO200-17-20/mobapp/src/pages/bottom-tab/bottom-tab.html"*/'<ion-tabs color="kolonialmork">\n    <ion-tab [root]="searchRoot" tabTitle="Søk" tabIcon="search" ></ion-tab>\n    <ion-tab [root]="cameraRoot" tabTitle="Scann" tabIcon="camera"></ion-tab>\n    <ion-tab [root]="checkoutRoot" tabTitle="Oversikt" tabIcon="cart"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/antim/PRO200-17-20/mobapp/src/pages/bottom-tab/bottom-tab.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], BottomTabPage);
    return BottomTabPage;
}());

//# sourceMappingURL=bottom-tab.js.map

/***/ })

});
//# sourceMappingURL=5.js.map