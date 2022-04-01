import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { MenuPage } from "../menu/menu";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { IonicSelectableComponent } from "ionic-selectable";
import { SubscriptionSummaryPage } from "../subscription-summary/subscription-summary";

@Component({
  selector: "page-subscription-book",
  templateUrl: "subscription-book.html",
})
export class SubscriptionBookPage {
  passwordType: string = "password";
  passwordIcon: string = "eye-off";

  from_login: any = [];
  visit_type;
  jsonBody: any;
  login_list: any;
  user_id;
  user_first_name;
  user_last_name;
  user_email;
  user_phone;
  subscriptionFormValue;
  params: any;
  messageList: any;
  api_code: any;
  token;

  public subscriptionForm: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.from_login = this.navParams.get("value");
    this.visit_type = this.navParams.get("visit_type");
    this.token = this.navParams.get("token");
    console.log("VALUE IN Login IS" + this.from_login);
    console.log("VISIT TYPE " + this.visit_type);
    console.log("TOKEN " + this.token);

    this.subscriptionForm = this._form.group({
      beneficiary: [""],
      f_name: ["", Validators.compose([Validators.required])],
      last_name: ["", Validators.compose([Validators.required])],
      phone_number: ["", Validators.compose([Validators.required])],
      email: [""],
      gender: ["", Validators.compose([Validators.required])],
      marital_status: [""],
      religion: [""],
      address: ["", Validators.compose([Validators.required])],
      emergency_name: [""],
      emergency_phone: [""],
      emergency_email: [""],
      emergency_address: [""],
      dob: [""],

      amount: ["", Validators.compose([Validators.required])],
      sub_name: [""],

      f_name_second: [""],
      l_name_second: [""],
      phone_number_second: [""],
      address_second: [""],
      dob_second: [""],
      gender_second: [""],
    });

    this.login_list = JSON.stringify(this.from_login);
    console.log("LOGIN LIST " + this.login_list);

    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.user_id = results_body["data"]["user_infos"][0].user_id;
    this.user_first_name = results_body["data"]["user_infos"][0].first_name;
    this.user_last_name = results_body["data"]["user_infos"][0].surname;
    this.user_email = results_body["data"].email;
    this.user_phone = results_body["data"]["user_infos"][0].phone;

    console.log("USER ID " + this.user_id);
    console.log("USER FNAME " + this.user_first_name);
    console.log("USER LNAME " + this.user_last_name);
    console.log("USER PHONE " + this.user_phone);
    console.log("USER EMAIL " + this.user_email);
  }

  book_subscription() {
    this.subscriptionFormValue = JSON.stringify(this.subscriptionForm.value);
    this.jsonBody = JSON.parse(this.subscriptionFormValue);

    console.log("THIS IS subscriptionForm VALUES" + this.subscriptionFormValue);
    console.log("THIS IS subscriptionFormValue JSON " + this.jsonBody);
    console.log("THIS IS THE USER ID" + this.user_id);
    console.log("USER NAME " + this.user_first_name);
    console.log("USER PHONE " + this.user_phone);

    // this.params = {
    //   user_id: this.user_id,
    //   f_name: this.jsonBody.f_name,
    //   last_name: this.jsonBody.last_name,
    //   phone_number: this.jsonBody.phone_number,
    //   email: this.jsonBody.email,
    //   gender: this.jsonBody.gender,
    //   marital_status: this.jsonBody.marital_status,
    //   religion: this.jsonBody.religion,
    //   address: this.jsonBody.address,
    //   emergency_name: this.jsonBody.emergency_name,
    //   emergency_phone: this.jsonBody.emergency_phone,
    //   emergency_email: this.jsonBody.emergency_email,
    //   emergency_address: this.jsonBody.emergency_address,
    //   sub_name: this.jsonBody.sub_name,
    //   amount: this.jsonBody.amount,
    //   user_name: this.user_first_name,
    //   user_phone: this.user_phone,
    //   dob: this.jsonBody.dob,
    //   f_name_second: this.jsonBody.f_name_second,
    //   l_name_second: this.jsonBody.l_name_second,
    //   phone_number_second: this.jsonBody.phone_number_second,
    //   address_second: this.jsonBody.address_second,
    //   dob_second: this.jsonBody.dob_second,
    //   gender_second: this.jsonBody.gender_second,
    // };

    this.params = {
      dob_age: this.jsonBody.dob,
      gender: this.jsonBody.gender,
      sub_master_id: this.visit_type,
      religion: this.jsonBody.religion,
      req_cat_id: "S",
      address: this.jsonBody.address,
      e_name: this.jsonBody.emergency_name,
      e_phone: this.jsonBody.emergency_phone,
      e_email: this.jsonBody.emergency_email,
      e_address: this.jsonBody.emergency_address,
      amount: this.jsonBody.amount,
      couple_details: {
        couple1: {
          name: this.jsonBody.f_name + this.jsonBody.last_name,
          age: this.jsonBody.dob,
          address: this.jsonBody.address,
        },
        couple2: {
          name: this.jsonBody.f_name_second + this.jsonBody.l_name_second,
          age: this.jsonBody.dob_second,
          address: this.jsonBody.address_second,
        },
      },
    };

    console.log("PARAMS" + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.book_subscription(this.params, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);

        loader.dismiss();

        this.navCtrl.push(SubscriptionSummaryPage, {
          value: this.from_login,
          params: this.params,
          token: this.token,
        });

        let alert = this.alertCtrl.create({
          title: "GHinger Healthcare",
          subTitle:
            "Your Subscription has been received successfully. The Ghinger team will call you shortly",
          buttons: ["OK"],
        });

        alert.present();
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
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }

  hideShowPassword() {
    console.log("err");
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }
}
