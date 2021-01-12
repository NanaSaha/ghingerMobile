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

  profile = { surname: "", other_names: "", mobile_number: "", email: "" };

  from_checkout: any;

  constructor(
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public _form: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user_details = this.navParams.get("user_details");
    this.user_id = this.user_details[0].reg_id;
    this.person_id = this.user_details[0].id;
    console.log("USER ID 1 " + this.user_id);
    console.log("PERSON ID 1 " + this.person_id);

    this.updateProfile = this._form.group({
      surname: ["", Validators.compose([Validators.required])],

      other_names: ["", Validators.compose([Validators.required])],
      mobile_number: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
    });

    if (this.navParams.get("user_details")) {
      this.profile.surname = this.user_details[0].surname;
      this.profile.other_names = this.user_details[0].other_names;
      this.profile.mobile_number = this.user_details[0].mobile_number;
      this.profile.email = this.user_details[0].email;
    }
  }

  editProfile() {
    this.loginVal = JSON.stringify(this.updateProfile.value);
    this.jsonBody = JSON.parse(this.loginVal);

    this.user_id = JSON.parse(this.user_details[0].reg_id);
    this.person_id = JSON.parse(this.user_details[0].id);
    console.log("loginVal " + this.loginVal);
    console.log("jsonBody " + this.jsonBody);
    console.log("USER ID 2 " + this.user_id);
    console.log("PERSON ID 2 " + this.person_id);

    this.params = {
      id: this.user_id,
      person_id: this.person_id,
      surname: this.jsonBody.surname,
      other_names: this.jsonBody.other_names,
      mobile_number: this.jsonBody.mobile_number,
      email: this.jsonBody.email,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.update_profile(this.params).then((result) => {
      this.body1 = result;
      this.retrieved = this.body1;
      this.retrieved = JSON.stringify(this.body1);
      console.log("retrieved " + this.retrieved);
    });

    loader.dismiss();

    this.navCtrl.setRoot(ProfilePage, {
      user_details: this.user_details,
      type: "edit",
    });
  }

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
