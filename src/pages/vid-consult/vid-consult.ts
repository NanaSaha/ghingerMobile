import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, NavParams, ViewController, App, Platform } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MenuPage } from '../menu/menu';
import { getRootNav } from '../../utils/navUtils';
import { NgZone } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { PersonalWelPage } from "../personal-wel/personal-wel";


@Component({
  selector: 'page-vid-consult',
  templateUrl: 'vid-consult.html',
})
export class VidConsultPage {

  public videoappointForm: any;
  alph: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  params2: any = [];
  params3: any = [];
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  sub_id: any;
  string: any;
  app_date: any;
  app_time: any;
  requester_id: any;
  appointmentVal: any;
  submitAttempt: boolean = false;
  appointmentType: any;
  minSelectabledate: any;
  maxSelectabledate: any;
  date: any;
  appointmentType1: string;
  amount: any;

  constructor(private zone: NgZone, public platform: Platform, public app: App, public menu: MenuController, public toastCtrl: ToastController, public _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.appointmentType = this.navParams.get('appointmentType');

    if (this.appointmentType) {
      switch (this.appointmentType) {
        case "PC":
          this.appointmentType1 = "Phone Consultation";
          break;

        case "VC":
          this.appointmentType1 = "Video Consultation";
          break;

        default:
          break;
      }
    }

    this.videoappointForm = this._form.group({

      "requester_cat": ["", Validators.compose([Validators.required])],
      "beneficiary_name": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],
      "beneficiary_phone_number": ["",
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.maxLength(10)])),
      ],
      "beneficiary_age": ['',
        ExtraValidators.conditional(group => group.controls.requester_cat.value == 'T', Validators.compose([Validators.required])),
      ],

      "req_urgency": ["", Validators.compose([Validators.required])],
      "proposed_date": ["", Validators.compose([Validators.required])],
      "proposed_time": ["", Validators.compose([Validators.required])],
      "appointment_type_id": [this.appointmentType],
      "complaint_desc": ["", Validators.compose([Validators.required])],
      "prev_medical_history": ["", Validators.compose([Validators.required])],
      "medication": [""],
      "allergies": [""],

    });

    this.from_login = this.navParams.get('value')
    this.from_login_doc = this.navParams.get('doc_value')
    this.from_login_pers = this.navParams.get('pers_value');

    console.log("--------- vid consult --------------------");
    console.log("this.from_login = " + this.from_login);
    console.log("this.from_login_doc = " + this.from_login_doc);
    console.log("this.from_login_pers = " + this.from_login_pers);
    console.log("--------- vid consult END--------------------");

    this.date = new Date();
    this.minSelectabledate = this.formatDate(this.date);
    this.maxSelectabledate = this.formatDatemax(this.date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneConsultPage');
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }



  submit() {

    this.from_login = this.navParams.get('value')
    console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);
    this.body = this.from_login; // this.body = Array.of(this.from_login)
    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);
    this.requester_id = this.jsonBody[0].id
    this.check = this.jsonBody[0]

    console.log("THIS IS THE REquester ID " + this.requester_id)
    console.log("THIS IS THE APP DATE " + this.app_date)
    console.log("THIS IS THE APP TIME " + this.app_time)


    this.appointmentVal = JSON.stringify(this.videoappointForm.value);

    this.jsonBody = JSON.parse(this.appointmentVal);

    console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal)
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody)
    console.log("THIS IS THE REQUESTER ID" + this.requester_id)
    console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time)
    console.log("THIS IS SUBUR ID" + this.sub_id)
    console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies)





    this.params3 = {
      "appt_id": this.jsonBody.appointment_type_id,
      "req_urgency": this.jsonBody.req_urgency,
    }


    console.log("PARAMS FOR SERVICE FEE " + this.params3)

    // let loader = this.loadingCtrl.create({
    //   content: "Processing...."

    // });

    // loader.present();

    this.data.retrive_service_price(this.params3).then((result) => {

      console.log("THIS IS THE SERVICE PRICES" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);

      this.amount = jsonBody[0].DoctorEarnings;

      console.log("AMOUNT FOR PHONE CONSULT" + this.amount);

      this.params2 = {
        "suburb_id": this.sub_id,
        "requester_id": this.requester_id,
        "requester_cat": this.jsonBody.requester_cat,
        "beneficiary_name": this.jsonBody.beneficiary_name,
        "beneficiary_age": this.jsonBody.beneficiary_age,
        "beneficiary_phone_number": this.jsonBody.beneficiary_phone_number,
        "req_urgency": this.jsonBody.req_urgency,
        "appointment_type_id": this.jsonBody.appointment_type_id,
        "proposed_date": this.jsonBody.proposed_date + " " + this.jsonBody.proposed_time,
        "complaint_desc": this.jsonBody.complaint_desc,
        "prev_medical_history": this.jsonBody.prev_medical_history,
        "allergies": this.jsonBody.allergies,
        "medication": this.jsonBody.medication,
        "appt_amnt": this.amount
      }

      console.log("PARAMS FOR APPOINTMENT " + JSON.stringify(this.params2))
      // loader.dismiss();


      let loader = this.loadingCtrl.create({
        content: "Booking appoinment. ..."

      });

      loader.present();

      this.data.phone_consult(this.params2).then((result) => {

        console.log("THIS IS THE RESULT" + result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody)


        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];


        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        loader.dismiss();

        if (this.api_code == "000") {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: desc,
            buttons: ['OK']
          });
          alert.present();

          console.log("--------- vid consult to menu page --------------------");
          console.log("this.from_login = " + this.from_login);
          console.log("this.from_login_doc = " + this.from_login_doc);
          console.log("this.from_login_pers = " + this.from_login_pers);
          console.log("--------- vid consult to menu page END--------------------");

          if (this.appointmentType == "VC") {
            
           
            this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });

          }
          else if (this.appointmentType == "PDVC") {
          
            this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });


          }

          if (this.appointmentType == "PC") {
            
            this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });

          }
          else if (this.appointmentType == "PDPC") {
           
            this.navCtrl.setRoot(MenuPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers });
  }

 
        }


        if (this.api_code == "555") {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: this.messageList,
            buttons: ['OK']
          });


          alert.present();
        }


      }, (err) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: "Could not process this request successfully.",
          duration: 5000
        }).present();

        console.log(err);
      });

      

    });






  }


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()),
      year = d.getFullYear();

    // console.log("year" + year + "and day = " + day);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log("year" + year + "and day = " + day);

    return [year, month, day].join('-');
  }

  formatDatemax(date) {
    var d = new Date(date),
      month = '' + (d.getMonth()),
      day = '' + (d.getDate()),
      year = d.getFullYear() + 1;

    console.log("year" + year + "and day = " + day);


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log("year" + year + "and day = " + day);
    return [year, month, day].join('-');
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
    control._parent
      .valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if (a && !b || !a && b) {
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
