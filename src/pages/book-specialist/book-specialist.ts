import { Component } from "@angular/core";
import { NavController, NavParams, App } from "ionic-angular";
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

@Component({
  selector: "page-book-specialist",
  templateUrl: "book-specialist.html",
})
export class BookSpecialistPage {
  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
  from_specialist;
  raw: any;
  alph: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  appointmentVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id: any;
  sub_id: any;
  minSelectabledate: any;
  maxSelectabledate: any;
  date: any;
  token;
  constructor(
    public app: App,
    public navCtrl: NavController,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.appointForm = this._form.group({
      request_cat_id: ["", Validators.compose([Validators.required])],
      beneficiary_name: [""],

      beneficiary_phone_number: [""],
      beneficiary_age: [""],
      request_urgency_id: ["", Validators.compose([Validators.required])],
      proposed_date: ["", Validators.compose([Validators.required])],
      proposed_time: ["", Validators.compose([Validators.required])],
      apt_type_id: ["SR"],
      complaint: ["", Validators.compose([Validators.required])],
      prev_history: ["", Validators.compose([Validators.required])],
      allergies: [""],
    });

    this.from_login = this.navParams.get("value");
    this.from_specialist = this.navParams.get("specialist_id");
    this.token = this.navParams.get("token");

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
    this.maxSelectabledate = this.formatDatemax(this.date);
  }

  book_appoint() {
    this.appointmentVal = JSON.stringify(this.appointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);

    console.log("THIS IS THE Provider ID " + this.from_specialist);

    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);
    console.log("THIS IS from_specialist" + this.from_specialist);
    console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies);

    this.params = {
      proposed_date: this.jsonBody.proposed_date,
      proposed_time: this.jsonBody.proposed_time,
      apt_type_id: this.jsonBody.apt_type_id,
      request_cat_id: this.jsonBody.request_cat_id,
      request_urgency_id: this.jsonBody.request_urgency_id,
      allergies: this.jsonBody.allergies,
      prev_history: this.jsonBody.prev_history,
      bene_name: this.jsonBody.beneficiary_name,
      bene_age: this.jsonBody.beneficiary_age,
      bene_contact: this.jsonBody.beneficiary_phone_number,
      complaint: this.jsonBody.complaint,
      specialist_master_id: this.from_specialist,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.specialist_appointment(this.params, this.token).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);

        loader.dismiss();

        this.navCtrl.setRoot(MenuPage, {
          value: this.from_login,
        });

        let alert = this.alertCtrl.create({
          title: "GHinger Healthcare",
          subTitle:
            "Your Specialist Appointment has been received successfully. The Ghinger team will call you shortly",
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

  public event = {
    month: "Year-Month-Day",
    timeStarts: "",
    timeEnds: "1990-02-20",
  };

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join("-");
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = "" + d.getMonth(),
      day = "" + d.getDate(),
      year = d.getFullYear() + 1;

    console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    console.log("year" + year + "and day = " + day);
    return [year, month, day].join("-");
  }
}
