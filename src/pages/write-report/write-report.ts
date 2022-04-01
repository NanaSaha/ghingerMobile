import { Component } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubscriptionHistoryDetailsPage } from "../subscription-history-details/subscription-history-details";

import { SubscriptionHistoryDocPage } from "../subscription-history-doc/subscription-history-doc";

@Component({
  selector: "page-write-report",
  templateUrl: "write-report.html",
})
export class WriteReportPage {
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
  public remarksForm: any;
  remarksFormValue;

  constructor(
    public alertCtrl: AlertController,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _form: FormBuilder
  ) {
    this.from_login = this.navParams.get("value");
    this.sub_items = this.navParams.get("sub_items");
    console.log("subscription_id " + this.sub_items);

    this.remarksForm = this._form.group({
      remark: ["", Validators.compose([Validators.required])],
    });
  }

  write_report() {
    this.remarksFormValue = JSON.stringify(this.remarksForm.value);
    this.jsonBody = JSON.parse(this.remarksFormValue);

    console.log("THIS IS subscriptionForm VALUES" + this.remarksFormValue);
    console.log("THIS IS subscriptionFormValue JSON " + this.jsonBody);
    console.log("THIS IS THE USER ID" + this.user_id);
    console.log("SUBSCRIPTION ID " + this.sub_items);
    console.log("REMARKS" + this.jsonBody.remark);

    this.params = {
      sub_id: this.sub_items,
      remark: this.jsonBody.remark,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log(this.params);

    this.data.make_remarks(this.params).then(
      (result) => {
        console.log(result);

        this.paymentJson = JSON.stringify(result);

        console.log("LETS SEE THE PROCESS ORDER " + this.paymentJson);
        this.list = JSON.parse(this.paymentJson);

        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.list = jsonBody;

        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Notes have been saved successfully",
          buttons: ["OK"],
        });
        alert.present();

        this.navCtrl.push(SubscriptionHistoryDetailsPage, {
          sub_items: this.sub_items,
          value: this.from_login,
        });

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
