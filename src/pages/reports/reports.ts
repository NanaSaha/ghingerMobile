import { Component } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { PaymentoptionPage } from "../paymentoption/paymentoption";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { MenuPage } from "../menu/menu";
import { DoctorHomePage } from "../doctorhome/doctorhome";

@Component({
  selector: "page-reports",
  templateUrl: "reports.html",
})
export class ReportsPage {
  sub_items;
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
  paramList;
  paramList2;
  amount;

  constructor(
    public alertCtrl: AlertController,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sub_items = this.navParams.get("sub_items");
    this.from_login = this.navParams.get("value");
    console.log("subscription_id " + this.sub_items);
    console.log("from_login " + this.from_login);
    console.log("STRINGIFY from_login " + JSON.stringify(this.from_login));
    console.log("USER TYPE []" + this.from_login[0].user_type);

    this.user_type = this.from_login[0].user_type;

    this.params = {
      sub_id: this.sub_items,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log(this.params);
    this.jsonBody = JSON.parse(this.newparams);

    this.data.subscription_history_details(this.jsonBody).then(
      (result) => {
        console.log(result);

        this.paymentJson = JSON.stringify(result);

        console.log("LETS SEE THE PROCESS ORDER " + this.paymentJson);
        this.list = JSON.parse(this.paymentJson);

        console.log(result);

        this.paramList = result["_body"];
        console.log("PARAMS LIST " + this.paramList);
        var phone1 = this.paramList[0].phone_number;
        console.log("PHONE 1 " + phone1);
        this.paramList2 = JSON.parse(this.paramList);
        this.list = this.paramList2;

        console.log("PARAMS " + this.list);
        console.log("PARAMS 2 " + this.paramList2);
        this.amount = this.paramList2[0].amount;
        console.log("AMount 2 " + this.amount);

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
}
