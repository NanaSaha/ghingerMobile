import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { SignupPage } from "../signup/signup";
import { MenuPage } from "../menu/menu";
import { NoticePage } from "../notice/notice";
import { PasswordPage } from "../password/password";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Http } from "@angular/http";
import { DoctorPage } from "../doctor/doctor";
import { FormBuilder, Validators } from "@angular/forms";
import { DoctorHomePage } from "../doctorhome/doctorhome";
import { Storage } from "@ionic/storage";
import moment from "moment";

import { TabsPage } from "../tabs/tabs";
import { CovidPage } from "../covid/covid";
import { ProfessionalInfoPage } from "../professionalinfo/professionalinfo";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  passwordType: string = "password";
  passwordIcon: string = "eye-off";

  splash = true;

  public showpassword: boolean;

  public loginForm: any;
  submitAttempt: boolean = false;
  loginVal: any;
  jsonBody: any;
  jsonBody1: any;
  messageList: any;
  api_code: any;
  Phonenumber: string;
  PIN: string;
  retrieve: string;
  retrieve_patient_details: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;
  retrieve_user_status: any;

  searchbar: any;
  from_login: any = [];

  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  body1: any;
  person_type: any;
  person_type1: any;
  doctor_id: any;
  id: any;
  doc_id: any;
  doctor_id2: any;
  doc_params: any = [];
  doc_params2: any = [];
  jsonBody3: any;
  jsonBody4: any;
  my_body: any;
  rememberme: any;

  public today = new Date().toISOString();

  requester_id: any;
  data1: any = [];

  constructor(
    public toastCtrl: ToastController,
    public data: DataProvider,
    public _form: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public storage: Storage
  ) {
    this.loginForm = this._form.group({
      password: ["", Validators.compose([Validators.required])],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
    });
  }

  ionViewDidLoad() {
    setTimeout(() => (this.splash = false), 4000);
    console.log("ionViewDidLoad Login Page");
  }

  params = {
    password: "",
    email: "",
  };

  signup() {
    this.navCtrl.push(SignupPage);
  }

  togglePasswordText() {
    console.log("SHOW STATUS" + this.showpassword);
    console.log("SHOW STATUS" + !this.showpassword);
    this.showpassword = !this.showpassword;
  }

  test_login() {
    this.navCtrl.setRoot(TabsPage);
  }

  login() {
    this.try_login_logic();
  }

  try_login_logic() {
    let loader = this.loadingCtrl.create({
      content: "Login processing..",
    });

    loader.present();

    setTimeout(() => {
      this.loginVal = JSON.stringify(this.loginForm.value);
      console.log("LETS SEE THE LOGIN VAL " + this.loginVal);

      this.jsonBody = JSON.parse(this.loginVal);

      console.log(
        "Start login request = " +
          moment().format("MMMM Do YYYY, h:mm:ss a") +
          " OR " +
          this.today
      );

      // //will remove this after UI is done
      // this.navCtrl.setRoot(MenuPage)
      // loader.dismiss();

      this.data.try_login(this.jsonBody).then(
        (result) => {
          // var results_body = result["_body"];
          var results_body = result;

          console.log(result);
          console.log("REVIEW RESULTS BODY " + results_body);
          //results_body = JSON.parse(results_body);

          this.retrieve_patient_details = JSON.stringify(results_body);

          var code = results_body["code"];
          var token = results_body["data"]["token"];
          var role = results_body["data"]["role"]["id"];
          var message = results_body["message"];

          console.log(
            "retrieve_patient_details " + this.retrieve_patient_details
          );
          console.log("LOGIN CODE " + code);
          console.log("TOKEN CODE " + token);
          console.log("ROLE CODE " + role);
          console.log("MESSAGE " + message);

          this.storage.set("person_type", role);

          if (code == "200") {
            //set token into storage
            this.storage.set("token", token);

            console.log("TOKEN STORED " + this.storage.set("token", token));

            //if user is a doctor
            if (role == "D") {
              setTimeout(() => {
                this.storage.set("user_login_type", "Doctor");

                this.storage.set("value", this.retrieve_patient_details);

                // this.navCtrl.setRoot(ProfessionalInfoPage, {
                //   regid: this.retrieve_patient_details,
                //   user_type1: role,
                //   value: this.retrieve_patient_details,
                // });

                this.navCtrl.setRoot(CovidPage, {
                  value: this.retrieve_patient_details,
                  token: token,
                });
              }, 1);

              setTimeout(() => {
                loader.dismiss();
              }, 1);
            }

            //if user is a Nurse
            else if (role == "N") {
              setTimeout(() => {
                this.storage.set("user_login_type", "Nurse");

                this.storage.set("value", this.retrieve_patient_details);

                this.navCtrl.setRoot(CovidPage, {
                  value: this.retrieve_patient_details,
                  token: token,
                });
              }, 1);

              setTimeout(() => {
                loader.dismiss();
              }, 1);
            }

            //if user is a Patient
            else if (role == "C") {
              setTimeout(() => {
                this.storage.set("user_login_type", "Patient");

                this.storage.set("value", this.retrieve_patient_details);

                this.navCtrl.setRoot(TabsPage, {
                  value: this.retrieve_patient_details,
                  token: token,
                });
              }, 1);

              setTimeout(() => {
                loader.dismiss();
              }, 1);
            } else {
              let alert = this.alertCtrl.create({
                title: "Ghinger",
                subTitle: message,
                buttons: ["OK"],
              });
              alert.present();
              loader.dismiss();
            }
          } else {
            let alert = this.alertCtrl.create({
              title: "Ghinger",
              subTitle: message,
              buttons: ["OK"],
            });
            alert.present();
            loader.dismiss();
          }
        },

        (err) => {
          let alert = this.alertCtrl.create({
            title: "No Account!",
            subTitle:
              "Invalid Email or Password. Kindly sign up to access GHinger",
            buttons: ["OK"],
          });
          alert.present();

          // let toast = this.toastCtrl.create({
          //   message:
          //     "Invalid Email or Password. Kindly sign up to access GHinger",
          //   duration: 5000,
          //   position: "top",
          // });
          // toast.present();

          loader.dismiss();
          console.log(JSON.stringify(err));
        }
      );
    }, 1);
  }

  reset() {
    this.navCtrl.push(PasswordPage);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }
}
