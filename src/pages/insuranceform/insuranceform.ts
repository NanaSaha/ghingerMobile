import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  Platform,
  Loading,
} from "ionic-angular";

@Component({
  selector: "page-insuranceform",
  templateUrl: "insuranceform.html",
})
export class InsuranceformPage {
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  insurance() {
    this.navCtrl.setRoot(MenuPage, {
      value: this.from_login,
    });

    let alert = this.alertCtrl.create({
      title: "GHinger Healthcare",
      subTitle: "The Ghinger team will contact you shortly",
      buttons: ["OK"],
    });

    alert.present();
  }
}
