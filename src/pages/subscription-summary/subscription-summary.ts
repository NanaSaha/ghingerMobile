import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { PaymentoptionPage } from "../paymentoption/paymentoption";
import { DataProvider } from "../../providers/data/data";
import { Http } from "@angular/http";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-subscription-summary",
  templateUrl: "subscription-summary.html",
})
export class SubscriptionSummaryPage {
  from_login;
  from_params;
  json_from_params;
  phone_number;
  user_id;
  params: any;
  login_list: any;
  jsonBody: any;
  subscription_id;
  amount;
  token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public data: DataProvider
  ) {
    this.from_login = this.navParams.get("value");
    this.from_params = this.navParams.get("params");

    console.log("VALUE IN Login IS" + this.from_login);
    console.log("PARAMS " + JSON.stringify(this.from_params));

    this.amount = this.from_params.amount;

    console.log("amount " + this.amount);
    this.token = this.navParams.get("token");

    // this.login_list = JSON.stringify(this.from_login);
    // this.jsonBody = JSON.parse(this.login_list);
    // this.user_id = this.jsonBody[0].id;
    // console.log("USER ID " + this.user_id);

    // this.params = {
    //   user_id: this.user_id,
    // };

    // let loader = this.loadingCtrl.create({
    //   content: "Please wait ...",
    // });

    // loader.present();

    // this.data.retrieve_subscription_id(this.params).then((result) => {
    //   console.log("THIS IS THE RESULT" + result);
    //   var jsonBody = result["_body"];

    //   var qp = JSON.parse(jsonBody);
    //   this.subscription_id = qp["id"];
    //   console.log(this.subscription_id);
    // });

    // loader.dismiss();
  }

  make_payment() {
    this.navCtrl.push(PaymentoptionPage, {
      value: this.from_login,
      params: this.amount,
      subscription_id: this.subscription_id,
      token: this.token,
    });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
