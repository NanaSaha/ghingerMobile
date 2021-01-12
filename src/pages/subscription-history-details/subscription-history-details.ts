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
import { SubscriptionSummaryPage } from "../subscription-summary/subscription-summary";

@Component({
  selector: "page-subscription-history-details",
  templateUrl: "subscription-history-details.html",
})
export class SubscriptionHistoryDetailsPage {
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
  user_first_name;
  user_phone;
  messageList;
  api_code;

  constructor(
    public alertCtrl: AlertController,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.sub_items = this.navParams.get("sub_items");
    this.from_login = this.navParams.get("value");
    console.log("subscription_id " + this.sub_items);
    console.log("from_login " + this.from_login);
    console.log("STRINGIFY from_login " + JSON.stringify(this.from_login));
    console.log("USER TYPE []" + this.from_login[0].user_type);

    this.user_id = this.from_login[0].id;
    this.user_first_name = this.from_login[0].other_names;
    this.user_phone = this.from_login[0].mobile_number;

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

  make_payment() {
    this.navCtrl.push(PaymentoptionPage, {
      value: this.from_login,
      params: this.amount,
      subscription_id: this.sub_items,
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

            this.data.book_subscription(this.params).then(
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
  // home() {
  //   if (this.user_type == "C") {
  //     this.navCtrl.setRoot(MenuPage);
  //   } else {
  //     this.navCtrl.setRoot(DoctorHomePage);
  //   }
  // }
}
