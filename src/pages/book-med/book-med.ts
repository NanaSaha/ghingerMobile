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
import { IonicSelectableComponent } from "ionic-selectable";

class Port {
  public id: number;
  public name: string;
  public price: string;
}

@Component({
  selector: "page-book-med",
  templateUrl: "book-med.html",
})
export class BookMedPage {
  ports: Port[];
  port: Port;
  public appointForm: any;
  from_hosp: any;
  from_login: any;
  from_login2: any;
  from_login3: any;
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
    this.ports = [
      { id: 1, name: "Tokai", price: "GHC230" },
      { id: 2, name: "Vladivostok", price: "GHC32" },
      { id: 3, name: "Navlakhi", price: "GHC12" },
    ];

    this.appointForm = this._form.group({
      requester_cat: ["", Validators.compose([Validators.required])],
      beneficiary_name: [""],

      beneficiary_phone_number: [""],
      beneficiary_age: [""],
      req_urgency: ["", Validators.compose([Validators.required])],
      proposed_date: ["", Validators.compose([Validators.required])],
      proposed_time: ["", Validators.compose([Validators.required])],
      appointment_type_id: ["MA"],
      complaint_desc: ["", Validators.compose([Validators.required])],
      prev_medical_history: ["", Validators.compose([Validators.required])],
      allergies: [""],
      location_name: [""],
    });

    this.from_hosp = this.navParams.get("value");
    this.from_login = this.navParams.get("another");

    this.storage.get("suburb_id").then((suburb_id) => {
      this.sub_id = suburb_id;
    });

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");

    this.showvalues1();

    this.body = this.from_login; // this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);
    this.requester_id = this.jsonBody[0].id;

    console.log("THIS IS THE requester_id ID is " + this.requester_id);
    console.log("THIS IS SUBUR ID CONSTRUCTOR " + this.sub_id);

    this.raw = this.from_hosp; // this.raw = JSON.stringify(this.from_hosp);

    this.body = this.from_login; // this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    console.log("Raw values from Hospital " + this.raw);
    console.log("from Hospital " + this.from_hosp);
    console.log("from LOgin" + this.from_login);

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
    this.maxSelectabledate = this.formatDatemax(this.date);
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }

  showvalues1() {
    console.log(
      "-----------------------Book Med Appt Page -----------------------"
    );
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login_doc = " + this.from_login3);
    console.log("this.from_login_pers = " + this.from_login2);
    console.log(
      "-----------------------Book Med Appt Page -----------------------"
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookMedPage");
  }

  public event = {
    month: "Year-Month-Day",
    timeStarts: "",
    timeEnds: "1990-02-20",
  };

  book_appoint() {
    // console.log()
    // this.showvalues();
    // this.navigate_to_Menu_page();

    this.appointmentVal = JSON.stringify(this.appointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal);
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody);

    console.log("THIS IS THE Provider ID " + this.from_hosp);
    console.log("THIS IS THE REQUESTER ID" + this.requester_id);
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time);
    console.log("THIS IS SUBUR ID" + this.sub_id);
    console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies);

    this.params = {
      suburb_id: this.sub_id,
      provider_id: this.from_hosp,
      requester_id: this.requester_id,
      requester_cat: this.jsonBody.requester_cat,
      beneficiary_name: this.jsonBody.beneficiary_name,
      // "beneficiary_gender":this.jsonBody.beneficiary_gender,
      beneficiary_phone_number: this.jsonBody.beneficiary_phone_number,
      beneficiary_age: this.jsonBody.beneficiary_age,
      req_urgency: this.jsonBody.req_urgency,
      appointment_type_id: this.jsonBody.appointment_type_id,
      proposed_date:
        this.jsonBody.proposed_date + " " + this.jsonBody.proposed_time,
      complaint_desc: this.jsonBody.complaint_desc,
      prev_medical_history: this.jsonBody.prev_medical_history,
      allergies: this.jsonBody.allergies,
    };

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.appointment(this.params).then(
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

        // console.log(this.app.getRootNav());
        //this.alph = this.app.getRootNavs()

        //this.alph =  this.app.getRootNavById('n4')
        // this.alph[0].setRoot(MenuPage, { value: this.from_login,doc_value: this.from_login3,pers_value: this.from_login2 });

        this.navigate_to_Menu_page();
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

  navigate_to_Menu_page() {
    console.log("--------------Moving to Menu -------------------");
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login3 = " + this.from_login3);
    console.log("this.from_login2 = " + this.from_login2);
    console.log("--------------Moving to Menu End -------------------");
    this.navCtrl.setRoot(MenuPage, {
      value: this.from_login,
      doc_value: this.from_login3,
      pers_value: this.from_login2,
    });
  }

  showvalues() {
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login3 = " + this.from_login3);
    console.log("this.from_login2 = " + this.from_login2);
  }

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

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}

export class ExtraValidators {
  static conditional(conditional, validator) {
    return function (control) {
      revalidateOnChanges(control);

      if (control && control._parent) {
        if (conditional(control._parent)) {
          return validator(control);
        }
      }
    };
  }
}

function revalidateOnChanges(control): void {
  if (control && control._parent && !control._revalidateOnChanges) {
    control._revalidateOnChanges = true;
    control._parent.valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if ((a && !b) || (!a && b)) {
          return false;
        } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
          return false;
        } else if (a && b) {
          for (let i in a) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
        }
        return true;
      })
      .subscribe(() => {
        control.updateValueAndValidity();
      });

    control.updateValueAndValidity();
  }
  return;
}
