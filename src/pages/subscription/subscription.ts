import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SubscriptionBookPage } from "../subscription-book/subscription-book";
import { MenuPage } from "../menu/menu";
import { DataProvider } from "../../providers/data/data";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { SubscriptionSummaryPage } from "../subscription-summary/subscription-summary";

@Component({
  selector: "page-subscription",
  templateUrl: "subscription.html",
})
export class SubscriptionPage {
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  visit_type;
  subscription_type;
  user_id;
  params: any;
  newparams;
  jsonBody: any;
  paymentJson;
  list;
  sub_name;
  sub_user_id;
  user_first_name;
  user_phone;
  messageList;
  api_code;
  token;

  constructor(
    public alertCtrl: AlertController,
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    console.log("We are in SUbscription page");
    this.from_login = this.navParams.get("value");

    this.subscription_type = this.navParams.get("sub_type");
    this.token = this.navParams.get("token");

    console.log("VALUE IN Login IS" + this.from_login);
    console.log("VALUE IN token IS" + this.token);

    console.log("sub_type TYPE" + this.subscription_type);

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.user_id = results_body["data"]["user_infos"][0].user_id;
    this.user_first_name = results_body["data"]["user_infos"][0].first_name;
    this.user_phone = results_body["data"]["user_infos"][0].phone;
    console.log("user_id " + this.user_id);
    // sub_name

    //CHECK IF USER SUBSCRIPTION EXIST

    // let loader = this.loadingCtrl.create({
    //   content: "Please wait ...",
    // });

    // loader.present();

    // this.data.subscription_history(this.user_id).then(
    //   (result) => {
    //     console.log(result);

    //     var string_results = JSON.stringify(result);

    //     console.log("SUBSCRIPTION HISTORY RESULTS " + string_results);

    //     loader.dismiss();
    //   },
    //   (err) => {
    //     loader.dismiss();
    //     let alert = this.alertCtrl.create({
    //       title: "",
    //       subTitle: "Sorry, cant connect right now. Please try again!",
    //       buttons: ["OK"],
    //     });
    //     alert.present();
    //   }
    // );
  }

  goto_subscription(visit_type) {
    this.visit_type = visit_type;
    console.log("VISIT TYPE" + this.visit_type);

    this.navCtrl.push(SubscriptionBookPage, {
      value: this.from_login,
      visit_type: visit_type,
      token: this.token,
    });
  }

  subscription_summary() {
    let confirm = this.alertCtrl.create({
      title: "Renew Subscription",
      message: "Do you want to proceed with the renewal?",

      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.user_id = this.list[0].user_id;

            console.log("SUBSCRIPTION USER ID SUMMARY TYPE" + this.user_id);
            console.log("f_name" + this.list[0].f_name);
            console.log("last_name" + this.list[0].last_name);

            this.params = {
              user_id: this.user_id,
              f_name: this.list[0].f_name,
              last_name: this.list[0].last_name,
              phone_number: this.list[0].phone_number,
              email: this.list[0].email,
              gender: this.list[0].gender,
              marital_status: this.list[0].marital_status,
              religion: this.list[0].religion,
              address: this.list[0].address,
              emergency_name: this.list[0].emergency_name,
              emergency_phone: this.list[0].emergency_phone,
              emergency_email: this.list[0].emergency_email,
              emergency_address: this.list[0].emergency_address,
              sub_name: this.list[0].sub_name,
              amount: this.list[0].amount,
              user_name: this.user_first_name,
              user_phone: this.user_phone,
              dob: this.list[0].dob,
              f_name_second: this.list[0].f_name_second,
              l_name_second: this.list[0].l_name_second,
              phone_number_second: this.list[0].phone_number_second,
              address_second: this.list[0].address_second,
              dob_second: this.list[0].dob_second,
              gender_second: this.list[0].gender_second,
            };

            console.log("PARAMS" + this.params);
            console.log("PARAMS STRING" + JSON.stringify(this.params));

            let loader = this.loadingCtrl.create({
              content: "Please wait ...",
            });

            loader.present();

            this.data.book_subscription(this.params, this.token).then(
              (result) => {
                console.log("THIS IS THE RESULT" + result);
                var jsonBody = result["_body"];
                console.log(jsonBody);

                jsonBody = JSON.parse(jsonBody);
                console.log(jsonBody);

                var desc = jsonBody["resp_desc"];
                var code = jsonBody["resp_code"];

                console.log(desc);
                console.log(code);

                this.messageList = desc;
                this.api_code = code;

                loader.dismiss();

                if (this.api_code == "000") {
                  let alert = this.alertCtrl.create({
                    title: "",
                    subTitle: this.messageList,
                    buttons: ["OK"],
                  });
                  alert.present();
                }

                this.navCtrl.push(SubscriptionSummaryPage, {
                  value: this.from_login,
                  params: this.params,
                });
              },
              (err) => {
                loader.dismiss();
                this.toastCtrl
                  .create({
                    message: "Could not complete this request successfully.",
                    duration: 5000,
                  })
                  .present();

                console.log(err);
              }
            );
          },
        },
      ],
    });
    confirm.present();
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
