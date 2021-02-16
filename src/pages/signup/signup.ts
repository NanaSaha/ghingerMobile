import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordValidation } from "./password-validation";
import "rxjs/add/operator/map";
import { AddRegisPage } from "../add-regis/add-regis";
import { ProfessionalInfoPage } from "../professionalinfo/professionalinfo";
import { TermsPage } from "../terms/terms";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage {
  public signupForm: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  signupVal: any;
  jsonBody: any;
  regid: any;
  maxSelectabledate: any;
  date: any;
  countries: any;
  regions: any;
  cities: any;
  suburbs: any;
  country_id: any;

   public showpassword: boolean;

  public itemList: Array<Object>;

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.signupForm = this._form.group(
      {
        surname: ["", Validators.compose([Validators.required])],

        other_names: ["", Validators.compose([Validators.required])],
        mobile_number: ["", Validators.compose([Validators.required])],

        // Validators.compose([Validators.maxLength(12), Validators.minLength(10), Validators.required])],
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            ),
          ]),
        ],
        user_type: ["", Validators.compose([Validators.required])],
        pds: [""],
        password: ["", Validators.compose([Validators.required])],
        referal_code: [""],
        // "confirmPassword": ["", Validators.compose([Validators.required])],
      }
      // {
      //   validator: PasswordValidation.MatchPassword // your validation method
      // }
    );

    this.date = new Date();
    this.maxSelectabledate = this.formatDatemax(this.date);

    // if (this.signupForm.value.country_id) {
    //   console.log("this.signupForm.value.country_id = " + this.signupForm.value.country_id);
    // }
  }

  // ionViewWillEnter() {
  //   this.getcountries();
  // }

  signup() {
    this.signupVal = JSON.stringify(this.signupForm.value);

    this.jsonBody = JSON.parse(this.signupVal);

    console.log("THIS IS THE SIGNUP raw values VALUES" + this.signupVal);
    console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody);

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.registration(this.jsonBody).then(
      (result) => {
        console.log(result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody);

        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];
        var user_type1 = jsonBody["user_type1"];
        this.regid = jsonBody["regid"];

        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        loader.dismiss();

        if (this.api_code == "000") {
          let loader = this.loadingCtrl.create({
            content: "Signing up...",
          });
          loader.present();

          if (user_type1 == "D" || user_type1 == "N") {
            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle:
                  "Sign up has been successful. Kindly complete the professional info form.",
                buttons: [
                  {
                    text: "OK",
                    handler: () => {
                      this.navCtrl.setRoot(ProfessionalInfoPage, {
                        regid: this.regid,
                        user_type1: user_type1,
                      });
                    },
                  },
                ],
              });
              alert.present();
            }, 3);

            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle:
                  "Sign up has been successful. Kindly complete the professional info form.",
                buttons: ["OK"],
              });
              loader.dismiss();
            }, 3);
          } else {
            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle: "Sign up has been successful. Kindly login..",
                buttons: [
                  {
                    text: "OK",
                    handler: () => {
                      this.navCtrl.setRoot(LoginPage, { value: this.jsonBody });
                    },
                  },
                ],
              });
              alert.present();
            }, 3);

            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle: "Sign up has been successful. Kindly login..",
                buttons: ["OK"],
              });
              loader.dismiss();
            }, 3);
          }
        } else {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });
          alert.present();
        }
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: "",
          subTitle:
            "Oops! We could not accept your registration. Kindly review your entries and try again",
          buttons: ["OK"],
        });
        alert.present();

        loader.dismiss();
        console.log(err);
      }
    );
  }

  signin() {
    this.navCtrl.push(LoginPage);
  }

 


  togglePasswordText() {
    console.log("SHOW STATUS" + this.showpassword)
     console.log("SHOW STATUS" + !this.showpassword)
    this.showpassword = !this.showpassword;
}

  experimentmovetoAddregisPage() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();
    setTimeout(() => {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Sign up has been successful. Kindly complete the professional info form.",
        // subTitle: "Sign up has been successful. A customer service person will contact you shortly to process your registration.",
        buttons: ["OK"],
      });
      alert.present();

      // this.navCtrl.setRoot(LoginPage, { value: this.jsonBody });
      this.navCtrl.push(ProfessionalInfoPage);
    }, 3);

    setTimeout(() => {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Sign up has been successful. Kindly complete the professional info form.",
        buttons: ["OK"],
      });
      loader.dismiss();
    }, 3);

    this.toastCtrl
      .create({
        message:
          "Sign up has been successful. Kindly complete the professional info form.",
        duration: 5000,
      })
      .present();
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    // console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }

  toc() {
    let profileModal = this.modalCtrl.create(TermsPage);
    profileModal.present();
  }
}
