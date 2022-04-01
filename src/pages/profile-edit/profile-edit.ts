import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";
import { DataProvider } from "../../providers/data/data";
import { ProfilePage } from "../profile/profile";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html",
})
export class ProfileEditPage {
  user_details: any;
  public updateProfile: any;
  loginVal: any;
  jsonBody: any;
  jsonBody1: any;

  messageList: any;
  api_code: any;
  Phonenumber: string;
  PIN: string;
  retrieve: string;
  retrieved: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;
  body1: any;
  params: any;
  body: any;
  user_id: any;
  person_id: any;

  profile = { surname: "", first_name: "", mobile_number: "", email: "" };

  from_checkout: any;
  token;

  constructor(
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public _form: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user_details = this.navParams.get("user_details");
    this.token = this.navParams.get("token");

    var results_body = JSON.parse(this.user_details);

    let user_mobile_number = results_body["data"]["user_infos"][0].phone;
    var role = results_body["data"]["role"]["id"];
    var user_id = results_body["data"]["user_infos"][0].user_id;
    var surname = results_body["data"]["user_infos"][0].surname;
    var other_names = results_body["data"]["user_infos"][0].first_name;
    var email = results_body["data"]["email"];

    console.log(role, user_id, surname, other_names, email);

    this.updateProfile = this._form.group({
      surname: ["", Validators.compose([Validators.required])],
      first_name: ["", Validators.compose([Validators.required])],
      mobile_number: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
    });

    if (this.navParams.get("user_details")) {
      this.profile.surname = results_body["data"]["user_infos"][0].surname;
      this.profile.first_name =
        results_body["data"]["user_infos"][0].first_name;
      this.profile.mobile_number = results_body["data"]["user_infos"][0].phone;
      this.profile.email = results_body["data"]["email"];
    }
  }

  editProfile() {
    this.loginVal = JSON.stringify(this.updateProfile.value);
    this.jsonBody = JSON.parse(this.loginVal);

    console.log("SURNAME " + this.jsonBody.surname);
    console.log("first_name " + this.jsonBody.first_name);
    console.log("mobile_number " + this.jsonBody.mobile_number);

    this.params = {
      surname: this.jsonBody.surname,
      first_name: this.jsonBody.first_name,
      email: this.jsonBody.email,
      phone: this.jsonBody.mobile_number,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.update_profile(this.params, this.token).then(
      (result) => {
        var results_body = result;
        console.log(result);
        console.log("JSON BODY" + results_body);
      },
      (err) => {
        console.log("UPDATE ERROR" + JSON.stringify(err));
      }
    );

    loader.dismiss();

    // this.navCtrl.setRoot(ProfilePage, {
    //   user_details: this.user_details,
    //   type: "edit",
    // });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
