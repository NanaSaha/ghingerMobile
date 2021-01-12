import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BookCovidPage } from '../book-covid/book-covid';
import { MenuPage } from "../menu/menu";
import { DataProvider } from "../../providers/data/data";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { SubscriptionSummaryPage } from "../subscription-summary/subscription-summary";


@Component({
  selector: 'page-covid',
  templateUrl: 'covid.html',
})
export class CovidPage {

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
    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.subscription_type = this.navParams.get("sub_type");
    console.log("VALUE IN Login IS" + this.from_login);
    console.log("VALUE INPERS VALUE IS" + this.from_login2);
    console.log("VALUE DoC VALUE IS" + this.from_login3);
    console.log("sub_type TYPE" + this.subscription_type);

    this.user_id = this.from_login[0].id;
    this.user_first_name = this.from_login[0].other_names;
    this.user_phone = this.from_login[0].mobile_number;
    console.log("user_id " + this.user_id);
    // sub_name

    //CHECK IF USER SUBSCRIPTION EXIST
    this.params = {
      user_id: this.user_id,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log(this.params);
    this.jsonBody = JSON.parse(this.newparams);

    this.data.subscription_history(this.jsonBody).then(
      (result) => {
        console.log(result);

        this.paymentJson = JSON.stringify(result);

        console.log("LETS SEE THE PROCESS ORDER " + this.paymentJson);
        this.list = JSON.parse(this.paymentJson);

        console.log(result);

        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.list = jsonBody;

        console.log(jsonBody);
        console.log(this.list);

        // this.sub_user_id = this.list[0].user_id;

        // console.log("SUBSCRIPTION USER ID TYPE" + this.sub_user_id);
        
        if (this.list.length == 0) {
          console.log("SUBSCRIPTION IS EMPTY")
          this.sub_user_id = ""
        }
        else {
          this.sub_user_id = this.list[0].user_id;

        console.log("SUBSCRIPTION USER ID TYPE" + this.sub_user_id);
        }

        
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

  goto_subscription(visit_type) {
    this.visit_type = visit_type;
    console.log("VISIT TYPE" + this.visit_type);

    this.navCtrl.push(BookCovidPage, {
      value: this.from_login,
      visit_type: visit_type,
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
}

