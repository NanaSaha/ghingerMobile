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

import { WriteReportPage } from "../write-report/write-report";
import { ReportsPage } from "../reports/reports";

@Component({
  selector: "page-subscription-history-doc",
  templateUrl: "subscription-history-doc.html",
})
export class SubscriptionHistoryDocPage {
  user_details;
  jsonBody: any;
  body: any;
  params: any;
  reg_id: any;
  user_type: any;
  from_login: any = [];
  doc_id: any;
  params2: any;
  select: any;
  orders: any;
  paymentJson: any;
  order_id: any;
  list: any;
  list2: any;
  q: any;
  newparams: any;
  login_list;

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    // this.from_login = this.navParams.get("from_login");
    // console.log("VALUE IN Login IS" + this.from_login);
    // this.login_list = JSON.stringify(this.from_login);
    // this.jsonBody = JSON.parse(this.login_list);
    // this.doc_id = this.jsonBody[0].id;
    // console.log("DOC ID " + this.doc_id);

    // this.params = {
    //   doc_id: this.doc_id,
    // };

    this.storage.get("value").then((value) => {
      this.user_details = value;
      console.log("this.user_details " + JSON.stringify(this.user_details));
      this.doc_id = this.user_details[0].id;
      console.log("doc_id " + this.doc_id);

      this.params = {
        doc_id: this.doc_id,
      };

      this.newparams = JSON.stringify(this.params);

      console.log("New params " + this.newparams);

      let loader = this.loadingCtrl.create({
        content: "Please wait ...",
      });

      loader.present();

      console.log(this.params);
      console.log(this.params);
      this.jsonBody = JSON.parse(this.newparams);

      this.data.subscription_history_for_doc(this.jsonBody).then(
        (result) => {
          console.log(result);

          this.paymentJson = JSON.stringify(result);

          console.log("LETS SEE THE PROCESS ORDER " + this.paymentJson);
          this.list = JSON.parse(this.paymentJson);

          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);
          this.list = jsonBody;

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
    });
  }

  history_details(item) {
    console.log(item);
    console.log("SUb ID " + item.id);

    this.navCtrl.push(SubscriptionHistoryDetailsPage, {
      sub_items: item.id,
      value: this.user_details,
    });
  }

  view_report(item) {
    console.log(item);
    console.log("SUb ID " + item.id);

    this.navCtrl.push(ReportsPage, {
      sub_items: item.id,
      value: this.user_details,
    });
  }

  write_report(item) {
    console.log(item);
    console.log("SUb ID " + item.id);

    this.navCtrl.push(WriteReportPage, {
      sub_items: item.id,
      value: this.user_details,
    });
  }
}
