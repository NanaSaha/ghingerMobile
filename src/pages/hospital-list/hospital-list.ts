import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Http } from "@angular/http";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { BookMedPage } from "../../pages/book-med/book-med";
import { MenuPage } from "../menu/menu";

import "rxjs/add/operator/map";
import { t } from "@angular/core/src/render3";

@Component({
  selector: "page-hospital-list",
  templateUrl: "hospital-list.html",
})
export class HospitalListPage {
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  body: any;
  jsonBody: any;
  params: any = [];
  raw: any;
  sub_name;
  token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.from_menu = this.navParams.get("value");
    this.from_login = this.navParams.get("another");
    this.sub_id = this.navParams.get("sub_id");
    this.sub_name = this.navParams.get("sub_name");
    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.token = this.navParams.get("token");

    this.raw = JSON.stringify(this.from_menu);

    console.log("Raw values from location" + this.raw);
    console.log("from location" + this.from_menu);
    console.log("from login" + this.from_login);
    console.log("SUBURB ID IN HOSPITAL LIST " + this.sub_id);
    console.log("PROVIDER NAME " + this.from_menu[0].provider_name);
    console.log("Suburb NAME " + this.from_menu[0].suburb);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HospitalListPage");
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  book(location) {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log("SELECTED CLINIC IS" + location.provider_name);
    console.log("SELECTED CLINIC ID IS" + location);
    let serv_id = location;

    setTimeout(() => {
      this.navCtrl.push(BookMedPage, {
        value: serv_id,
        another: this.from_login,
        sub_id: this.sub_id,
        token: this.token,
      });
    }, 3);

    setTimeout(() => {
      loader.dismiss();
    }, 3);
  }
}
