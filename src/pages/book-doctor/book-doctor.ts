import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { MenuPage } from "../menu/menu";
import { PersonalModalPage } from "../personal-modal/personal-modal";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  selector: "page-book-doctor",
  templateUrl: "book-doctor.html",
})
export class BookDoctorPage {
  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
  raw: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  appointmentVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id: any;
  sub_id: any = [];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public data: DataProvider,
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.appointForm = this._form.group({
      // "requester_cat": ["", Validators.compose([Validators.required])],
      // "beneficiary_name": [""],

      // "proposed_date": [""],
      // "proposed_time": [""],
      // "appointment_type_id": ["PD"],
      // "complaint_desc": ["", Validators.compose([Validators.required])],
      // "prev_medical_history": ["", Validators.compose([Validators.required])],
      // "allergies": [""]

      requester_cat: [""],
      beneficiary_name: [""],

      proposed_date: [""],
      proposed_time: [""],
      appointment_type_id: ["PD"],
      complaint_desc: [""],
      prev_medical_history: [""],
      allergies: [""],
    });

    this.from_hosp = this.navParams.get("value");
    this.from_login = this.navParams.get("another");
    this.sub_id = this.navParams.get("sub_id");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");

    this.body = Array.of(this.from_login);

    this.jsonBody = JSON.parse(this.body);
    this.requester_id = this.jsonBody[0].id;

    console.log("THIS IS THE requester_id ID is " + this.requester_id);

    this.raw = JSON.stringify(this.from_hosp);

    this.body = Array.of(this.from_login);

    this.jsonBody = JSON.parse(this.body);

    console.log("Raw values from Hospital " + this.raw);
    console.log("from Hospital " + this.from_hosp);
    console.log("from LOgin" + this.from_login);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookMedPage");
  }

  public event = {
    month: "Year-Month-Day",
    // timeStarts: '07:43',
    timeStarts: "",
    timeEnds: "1990-02-20",
  };

  submit() {
    let modal = this.modalCtrl.create(PersonalModalPage);

    modal.present();
  }

  book_appoint() {
    this.appointmentVal = JSON.stringify(this.appointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);

    console.log("THIS IS THE Provider ID " + this.from_hosp);
    console.log("THIS IS THE REQUESTER ID" + this.requester_id);
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);

    this.params = {
      suburb_id: this.sub_id,
      requester_id: this.requester_id,
      requester_cat: this.jsonBody.requester_cat,
      beneficiary_name: this.jsonBody.beneficiary_name,
      appointment_type_id: this.jsonBody.appointment_type_id,
      proposed_time: this.jsonBody.proposed_time,
      proposed_date: this.jsonBody.proposed_date,
      complaint_desc: this.jsonBody.complaint_desc,
      prev_medical_history: this.jsonBody.prev_medical_history,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.doc_appointment(this.params).then(
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
        this.navCtrl.setRoot(MenuPage, {
          value: this.from_login,
          doc_value: this.from_login3,
          pers_value: this.from_login2,
        });
      },
      (err) => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not process this request successfully.",
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
}
