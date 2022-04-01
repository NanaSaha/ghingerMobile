import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { LoginPage } from "../login/login";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import { DataProvider } from "../../providers/data/data";
import { DoctorPage } from "../doctor/doctor";
import { Http } from "@angular/http";
import { IonicSelectableComponent } from "ionic-selectable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";

@Component({
  selector: "page-add-regis",
  templateUrl: "add-regis.html",
})
export class AddRegisPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;
  public signupForm: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  signupVal: any;
  jsonBody: any;

  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  from_regis_id: any = [];
  body: any;

  params: any = [];
  params2: any = [];
  from_login: any = [];
  sub_id: any;
  string: any;
  surburb_id: any;
  registration_number: any;
  registration_board: any;
  specialty: any;
  specialty_name: any;
  id: any;
  hospital_name: any;
  has_specialty: any;
  specialty_duration: any;
  license_number: any;
  medical_regulator: any;
  has_foriegn_training: any;
  foreign_medical_regulator: any;
  foreign_license_number: any;

  body1: any;
  jsonBody1: any;
  jsonBody2: any;
  body2: any;
  suburbs: any;
  surb;
  cities: any;
  token;

  constructor(
    public toastCtrl: ToastController,
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.from_login = this.navParams.get("value");
    this.from_regis_id = this.navParams.get("doc_value");

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    this.body = Array.of(this.from_regis_id);
    this.jsonBody = JSON.parse(this.body);

    this.id = this.jsonBody[0].id;

    console.log("VALUE of DOCTOR ID IS " + this.id);

    this.getProfessional_groups();
    this.getSpecialties();

    this.data.get_all_suburbs().then(
      (result) => {
        console.log(result);
        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.suburbs = jsonBody;

        console.log("Jsson body " + JSON.stringify(jsonBody));
      },
      (err) => {
        console.log("error = " + JSON.stringify(err));
      }
    );
  }

  get_suburbs(city_id) {
    if (city_id) {
      this.storage.set("city_id", city_id.id);

      console.log("city_id = " + JSON.stringify(city_id.id));

      setTimeout(() => {
        this.data.get_suburbs_by_city(city_id.id, this.token).then(
          (result) => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.suburbs = jsonBody;
            // loading.dismiss();

            console.log("Jsson body " + JSON.stringify(jsonBody));
          },
          (err) => {
            // loading.dismiss();
            this.showalertmessage(
              "Ghinger",
              "Sorry. An Error occured. Kindly refresh and try again."
            );
            this.showmessage(
              "Sorry. An Error occured. Kindly refresh and try again."
            );
            console.log("error = " + JSON.stringify(err));
          }
        );
      }, 1);
    }
  }

  surburbChange(event: { component: IonicSelectableComponent; value: any }) {
    this.surb = event.value;
    console.log("Surburb Id:", this.surb.id);
    console.log("Surburb Name:", this.surb.suburb_name);
  }

  signup() {
    // let data = this.searchbar.getValue();
    let data = this.surb.suburb_name;
    console.log("LOCATION ENTERED " + data);

    this.params = {
      location: data,
    };

    console.log("PARAMETERS" + this.params);

    this.data.hospitals(this.params).then(
      (result) => {
        console.log("RESULTS IS " + result);

        var body = result["_body"];
        body = JSON.parse(body);
        this.check = body;
        console.log("RESULTS IS " + this.check);
        this.string = JSON.stringify(this.check);
        console.log("LETS SEE THE STRING " + this.string);

        this.jsonBody = JSON.parse(this.string);

        this.sub_id = this.jsonBody[0].suburb_id;
        console.log("LETS SEE THE Surburb " + this.sub_id);

        this.params2 = {
          id: this.id,
          surburb_id: this.sub_id,
          hospital_name: this.hospital_name,
          has_specialty: this.has_specialty,
          specialty_name: this.specialty_name,
          specialty_duration: this.specialty_duration,
          license_number: this.license_number,
          medical_regulator: this.medical_regulator,
          has_foriegn_training: this.has_foriegn_training,
          foreign_medical_regulator: this.foreign_medical_regulator,
          foreign_license_number: this.foreign_license_number,
          // "hospital_name": this.hospital_name,

          // "registration_number": this.registration_number,
          // "registration_board": this.registration_board,
          // "specialty": this.specialty,
          // "specialty_name": this.specialty_name,
        };

        console.log("Add regis params = " + this.params2);

        console.log(
          "THIS IS THE STRINGIFY SIGNUP VALUES" + JSON.stringify(this.params2)
        );
        console.log("THIS IS THE SIGNUP VALUES" + this.params2);

        let loader = this.loadingCtrl.create({
          content: "Please wait ...",
        });

        loader.present();

        this.data.update_registration(this.params2, this.token).then(
          (result) => {
            console.log(result);
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
              let loader = this.loadingCtrl.create({
                content: "Submitting...",
                // duration: 5000
              });
              loader.present();

              this.navCtrl.setRoot(DoctorPage, {
                value: this.from_login,
                pers_value: this.from_regis_id,
              });
              this.toastCtrl
                .create({
                  message: "Submission successful..",
                  duration: 5000,
                })
                .present();

              setTimeout(() => {
                loader.dismiss();
              }, 3000);
            }

            if (this.api_code != "000") {
              let alert = this.alertCtrl.create({
                title: "",
                subTitle: this.messageList,
                buttons: ["OK"],
              });
              this.navCtrl.setRoot(DoctorPage, { value: this.from_login });
              this.toastCtrl
                .create({
                  message:
                    "Registration was not successful. Please Try again..",
                  duration: 5000,
                })
                .present();
              alert.present();
            }
          },
          (err) => {
            let alert = this.alertCtrl.create({
              title: "",
              subTitle: "Registration unsuccessful",
              buttons: ["OK"],
            });
            alert.present();

            this.toastCtrl
              .create({
                message:
                  "Please ensure that all details provided are correct and try again.",
                duration: 5000,
              })
              .present();
            loader.dismiss();
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSpecialties() {
    this.data.get_specialties().then(
      (result) => {
        console.log("Result = " + result);
        var body = result["_body"];
        console.log('result["_body"] = ' + body);

        body = JSON.parse(body);

        this.jsonBody = JSON.stringify(body);
        console.log("jsonBody = " + this.jsonBody);

        this.body1 = Array.of(this.jsonBody);
        this.jsonBody1 = JSON.parse(this.body1);
        // this.person_type1 = this.jsonBody1[0].surname

        console.log(
          "specialty id= " +
            this.jsonBody1[0].id +
            " title = " +
            this.jsonBody1[0].title
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProfessional_groups() {
    this.data.get_professional_groups().then(
      (result) => {
        console.log("get professional groups Result = " + result);
        var body2 = result["_body"];
        console.log('result["_body"] = ' + body2);

        body2 = JSON.parse(body2);

        this.jsonBody2 = JSON.stringify(body2);
        console.log("jsonBody = " + this.jsonBody2);

        this.body2 = Array.of(this.jsonBody2);
        this.jsonBody2 = JSON.parse(this.body2);
        // this.person_type1 = this.jsonBody1[0].surname

        console.log(
          "Professional group id= " +
            this.jsonBody2[0].id +
            " title = " +
            this.jsonBody2[0].group_name
        );
      },
      (err) => {
        console.log(err);
      }
    );
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
}
