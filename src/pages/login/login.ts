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

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {

   passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  splash = true;

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
  retrieve1: string;
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
    this.storage.get("remember").then((remember) => {
      console.log("remember = " + remember);
      if (remember == true) {
        this.storage.get("user_login_type").then((user_login_type) => {
          if (user_login_type == "Doctor") {
            this.navCtrl.setRoot(DoctorHomePage);
          } else if (user_login_type == "Patient") {
            // this.navCtrl.setRoot(MenuPage);
            this.navCtrl.setRoot(MenuPage);
          }
        });
      }
    });

    this.loginForm = this._form.group({
      password: ["", Validators.compose([Validators.required])],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      rememberme: [false],
    });
  }

  ionViewDidLoad() {
    setTimeout(() => (this.splash = false), 4000);
    console.log("ionViewDidLoad SliderPage");
  }

  params = {
    password: "",
    email: "",
  };

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login() {
    this.try_login_logic();
  }

  try_login_logic() {
    if (this.rememberme) {
      console.log("rememberme = " + this.rememberme);
      if (this.rememberme == false) {
        console.log("rememberme is false = " + this.rememberme);
        this.storage.clear();
      } else {
        console.log(
          "rememberme is true ... setting remember = " + this.rememberme
        );
        this.storage.set("remember", true);
      }
    } else {
      console.log("rememberme is false = " + this.rememberme);
      this.storage.clear();
    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
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
          var body1 = result["_body"];
          body1 = JSON.parse(body1);

          this.retrieve1 = body1;
          this.retrieve1 = JSON.stringify(body1);
          console.log(
            "##################### 1. START retrieve1 #############################"
          );
          console.log(
            "LETS SEE THE PERSONAL DATA RETRIEVED : retrieve1 " +
              JSON.stringify(this.retrieve1)
          );
          console.log("PARAMS = jsonBody " + JSON.stringify(this.jsonBody));
          console.log(
            "####################### END retrieve1 #############################"
          );

          this.body1 = Array.of(this.retrieve1);
          this.jsonBody1 = JSON.parse(this.body1);

          console.log(
            " this.jsonBody1 = " + JSON.stringify(this.jsonBody1.resp_desc)
          );

          if (this.jsonBody1["LOGIN_SUC"]) {
            var desc = this.jsonBody1["LOGIN_SUC"].resp_desc;
            var code = this.jsonBody1["LOGIN_SUC"].resp_code;

            console.log(desc);
            console.log(code);

            this.messageList = desc;
            this.api_code = code;

            if (this.api_code == "117") {
              let loader = this.loadingCtrl.create({
                content: "Login processing...",
              });

              loader.present();

              //process the other variables

              if (this.jsonBody1["result1"]) {
                console.log(
                  "this.jsonBody1['result1'] =  " +
                    JSON.stringify(this.jsonBody1["result1"])
                );

                // this.my_body = JSON.parse(this.jsonBody1["result1"]);
                this.my_body = this.jsonBody1["result1"];

                this.my_body = JSON.stringify(this.my_body);
                console.log("jsonBody = " + this.my_body);

                this.my_body = Array.of(this.my_body);
                this.my_body = JSON.parse(this.my_body);

                if (this.my_body[0].user_type) {
                  this.person_type1 = this.my_body[0].user_type;
                  this.storage.set("person_type", this.person_type1);
                  console.log("VALUE of USER TYPE  IS " + this.person_type1);
                }
              }

              //result1
              if (this.jsonBody1["result1"]) {
                console.log("result 1 begin");

                this.my_body = this.jsonBody1["result1"];
                this.my_body = JSON.stringify(this.my_body);

                this.my_body = JSON.parse(this.my_body);

                this.retrieve1 = this.my_body;

                console.log(
                  "this.jsonBody1['result1'] : retrieve1 " +
                    JSON.stringify(this.retrieve1)
                );
                console.log("result 1 end");
              }

              //result2
              if (this.jsonBody1["result2"]) {
                console.log("result 2 begin");

                this.my_body = this.jsonBody1["result2"];
                this.my_body = JSON.stringify(this.my_body);
                console.log("jsonBody = " + this.my_body);
                this.my_body = JSON.parse(this.my_body);

                this.retrieve = this.my_body;

                console.log("result 2 end");
              }

              //result3
              if (this.jsonBody1["result3"]) {
                this.my_body = this.jsonBody1["result3"];
                this.my_body = JSON.stringify(this.my_body);
                console.log("jsonBody = " + this.my_body);
                this.my_body = JSON.parse(this.my_body);

                this.retrieve_pers = this.my_body;
              }

              //result4
              if (this.jsonBody1["result4"]) {
                this.my_body = this.jsonBody1["result4"];
                this.my_body = JSON.stringify(this.my_body);
                console.log("jsonBody = " + this.my_body);
                this.my_body = JSON.parse(this.my_body);

                this.retrieve_doc = this.my_body;
                this.retrieve_doc3 = this.my_body;

                console.log("RETRIEVE DOC " + this.retrieve_doc);
              }

              if (this.jsonBody1["retrieve_user_status"]) {
                console.log("retrieve_user_status begin");

                this.my_body = this.jsonBody1["retrieve_user_status"];
                this.my_body = JSON.stringify(this.my_body);
                console.log("jsonBody = " + this.my_body);
                this.my_body = JSON.parse(this.my_body);

                this.retrieve_user_status = this.my_body;

                console.log("retrieve_user_status end");
              }

              if (this.person_type1) {
                console.log(
                  "############## this.person_type1 ##################" +
                    this.person_type1
                );
                if (this.person_type1 == "D") {
                  setTimeout(() => {
                    this.storage.set("user_login_type", "Doctor");

                    this.storage.set("value", this.retrieve);
                    this.storage.set("doc_value", this.retrieve_doc);
                    this.storage.set("pers_value", this.retrieve_pers);
                    this.storage.set("doc_value2", this.retrieve1);
                    this.storage.set(
                      "retrieve_user_status",
                      this.retrieve_user_status
                    );

                    this.navCtrl.setRoot(DoctorHomePage, {
                      value: this.retrieve,
                      doc_value: this.retrieve_doc,
                      pers_value: this.retrieve_pers,
                      doc_value2: this.retrieve1,
                      retrieve_user_status: this.retrieve_user_status,
                    });
                  }, 1);

                  setTimeout(() => {
                    loader.dismiss();
                  }, 1);
                } else if (this.person_type1 == "N") {
                  setTimeout(() => {
                    this.storage.set("user_login_type", "Nurse");

                    this.storage.set("value", this.retrieve);
                    this.storage.set("doc_value", this.retrieve_doc);
                    this.storage.set("pers_value", this.retrieve_pers);
                    this.storage.set("doc_value2", this.retrieve1);
                    this.storage.set(
                      "retrieve_user_status",
                      this.retrieve_user_status
                    );

                    this.navCtrl.setRoot(DoctorHomePage, {
                      value: this.retrieve,
                      doc_value: this.retrieve_doc,
                      pers_value: this.retrieve_pers,
                      doc_value2: this.retrieve1,
                      retrieve_user_status: this.retrieve_user_status,
                    });
                  }, 1);

                  setTimeout(() => {
                    loader.dismiss();
                  }, 1);
                } else if (this.person_type1 == "C") {
                  console.log(
                    "############## this.person_type1 ##################" +
                      this.person_type1 +
                      "go to menu page"
                  );
                  setTimeout(() => {
                    this.storage.set("user_login_type", "Patient");

                    this.storage.set("value", this.retrieve);
                    this.storage.set("doc_value", this.retrieve_doc3);
                    this.storage.set("pers_value", this.retrieve_pers);
                    this.storage.set("results_1", this.retrieve1);

                    console.log(
                      "after login successful, we are heading to Menupage - By Padmore"
                    );

                    this.navCtrl.setRoot(MenuPage, { value: this.retrieve });
                  }, 1);

                  setTimeout(() => {
                    loader.dismiss();
                  }, 1);
                } else {
                  let alert = this.alertCtrl.create({
                    title: "Ghinger",
                    subTitle: "Cannot be logged on at this time.",
                    buttons: ["OK"],
                  });
                  alert.present();
                }
              }
            } else {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle: this.messageList,
                buttons: ["OK"],
              });
              alert.present();
            }
          } else {
            this.messageList = JSON.stringify(this.jsonBody1.resp_desc);

            let alert = this.alertCtrl.create({
              title: "Ghinger",
              subTitle: this.messageList,
              buttons: ["OK"],
            });
            alert.present();
          }

          loader.dismiss();
        },
        (err) => {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle:
              "Your internet connection has been lost. Please check your internet and try again.",
            buttons: ["OK"],
          });
          alert.present();

          let toast = this.toastCtrl.create({
            message:
              "Your internet connection has been lost. Please check your internet and try again.",
            duration: 5000,
            position: "top",
          });
          toast.present();

          loader.dismiss();
          console.log(JSON.stringify(err));
        }
      );
    }, 1);
  }

  check_rememberme() {
    console.log("rememberme  state:" + this.rememberme);
  }

  reset() {
    this.navCtrl.push(PasswordPage);
  }




  hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }
}
