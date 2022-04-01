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

  step: any = 1;

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

        first_name: ["", Validators.compose([Validators.required])],
        phone: ["", Validators.compose([Validators.required])],
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            ),
          ]),
        ],
        role_id: ["", Validators.compose([Validators.required])],
        password: ["", Validators.compose([Validators.required])],
        referal_code: [""],
        confirmPassword: ["", Validators.compose([Validators.required])],
      },
      { validator: PasswordValidation.MatchPassword } // your validation method
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

  submit() {
    this.step = this.step + 1;
  }

  prev() {
    this.step = this.step - 1;
  }

  //  signup() {
  //   this.signupVal = JSON.stringify(this.signupForm.value);

  //   this.jsonBody = JSON.parse(this.signupVal);

  //   console.log("THIS IS THE SIGNUP raw values VALUES" + this.signupVal);
  //   console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody);

  //   let loader = this.loadingCtrl.create({
  //     content: "Please wait ...",
  //   });

  //   loader.present();

  //    this.navCtrl.setRoot(LoginPage, { value: this.jsonBody })
  //      loader.dismiss();
  // }

  signup() {
    //JSON stringified
    this.signupVal = JSON.stringify(this.signupForm.value);

    //Array Objects of user details
    this.jsonBody = JSON.parse(this.signupVal);

    console.log("JSON BODY BEOFRE LOGIN IN" + this.jsonBody);

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.registration(this.jsonBody).then(
      (result) => {
        // var results_body = result["_body"];
        var results_body = result;
        console.log(result);
        console.log("JSON BODY" + results_body);

        // var body_array = JSON.parse(results_body);

        var code = results_body["code"];
        var role = results_body["data"]["role"]["id"];
        this.regid = results_body["data"]["id"];

        console.log("Code " + code);
        console.log("ROLE " + role);
        console.log("REGG " + this.regid);

        if (code == "200") {
          if (role == "D" || role == "N") {
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
                        user_type1: role,
                      });

                      // this.navCtrl.setRoot(ProfessionalInfoPage, {
                      //   regid: this.retrieve_patient_details,
                      //   user_type1: role,
                      //   value: this.retrieve_patient_details,
                      // });

                      // this.navCtrl.setRoot(LoginPage, {
                      //   value: this.jsonBody,
                      // });
                    },
                  },
                ],
              });
              alert.present();
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
              loader.dismiss();
            }, 3);
          }
          // loader.dismiss();
        } else {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle:
              "You already have an account with Ghinger. So please login or click on 'Forget Password' to reset your password",
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
          loader.dismiss();
        }
      },
      (err) => {
        console.log("ERROR :::::", err);
        // let alert = this.alertCtrl.create({
        //   title: "",
        //   subTitle:
        //     "Oops! We could not accept your registration. Kindly review your entries and try again",
        //   buttons: ["OK"],
        // });
        let alert = this.alertCtrl.create({
          title: "Oops!",
          subTitle:
            "You already have an account with Ghinger. <br> So please login or click on 'Forget Password' to reset your password",
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
        loader.dismiss();
      }
    );
  }

  signin() {
    this.navCtrl.push(LoginPage);
  }

  togglePasswordText() {
    console.log("SHOW STATUS" + this.showpassword);
    console.log("SHOW STATUS" + !this.showpassword);
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

    // console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    // console.log("year" + year + "and day = " + day);

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
