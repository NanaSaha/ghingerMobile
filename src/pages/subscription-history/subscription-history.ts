import { Component } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Storage } from "@ionic/storage";

import { SubscriptionHistoryDetailsPage } from "../subscription-history-details/subscription-history-details";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-subscription-history",
  templateUrl: "subscription-history.html",
})
export class SubscriptionHistoryPage {
  user_details;
  jsonBody: any;
  body: any;

  params: any;
  reg_id: any;
  user_type: any;
  from_login: any = [];

  user_id: any;

  params2: any;
  select: any;
  orders: any;
  paymentJson: any;
  order_id: any;
  list: any;
  list2: any;
  q: any;
  newparams: any;
  token;

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log(this.params);

    this.data.subscription_history().then(
      (result) => {
        console.log(result);

        console.log("THIS IS THE RESULT" + result);
        console.log("THIS IS THE ONLY DATARESULT" + result["data"]);
        this.list = result["data"];
        loader.dismiss();
      },
      (err) => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Sorry, cant connect right now. Please try again!",
          buttons: ["OK"],
        });
        alert.present();
      }
    );
  }

  history_details(item) {
    console.log(item);
    console.log("SUb ID " + item.id);

    this.navCtrl.push(SubscriptionHistoryDetailsPage, {
      sub_items: item.id,
      params: this.list,
      value: this.user_details,
    });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
