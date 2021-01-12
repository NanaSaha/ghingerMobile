import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController, ToastController, LoadingController, AlertController, ModalController,Events } from 'ionic-angular';
import { PatientDetailsPage } from '../patient-details/patient-details';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-patient-new-record',
  templateUrl: 'patient-new-record.html',
})
export class PatientNewRecordPage {
  public record: any;
  from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  body2: any;
  jsonBody: any;
  params: any = [];
  doctor_id: any;
  data: any = [];
  requester_id: any;
  doc_id: any;
  recordValue: any;
  doc_details: any;
  retrieve: any
  doctor_id1: any;
  confirmed_appointment_id : any;
  patient_id : any;
  full_name : any;

  constructor(public data1: DataProvider, public _form: FormBuilder, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController,public events: Events,public viewCtrl: ViewController) {
    this.check = this.navParams.get('value')
    this.data = this.navParams.get('user_data')
    this.doctor_id1 = this.navParams.get('doc_id')
    this.confirmed_appointment_id = this.navParams.get('appointment_id')
    this.patient_id = this.navParams.get('patient_id')
    this.full_name = this.navParams.get('full_name')
    
    

    this.doc_details = this.navParams.get('doc_details')
    this.retrieve = this.navParams.get('retrieve')
    console.log('VALUE IN PATIENT DETAIL CONSTRUCTOR IS' + this.check);
    console.log("Value of User data in patient details page is " + this.data)
    console.log("Value of doc_details in patient details page is " + this.doc_details)


    if (this.data) {
      this.body = Array.of(this.data);
      console.log("ARRAY " + this.body)
      if (this.body[0]) {
        if (this.body[0].patient_id) {
          this.requester_id = this.body[0].patient_id
        }

      }
    }

    if (this.doc_details) {
      this.body2 = JSON.parse(this.doc_details)
      console.log("JSON " + this.body2)
      if (this.body2[0]) {
        this.doc_id = this.body2[0].id
      }
    }

    console.log("THIS IS THE requester_id " + this.requester_id)
    console.log("THIS IS THE doc_id " + this.doc_id + " AND doctor_id1 = "+JSON.stringify(this.doctor_id1))


    this.record = this._form.group({

      "clinical_complaints": ["", Validators.compose([Validators.required])],
      "clinical_examinations": [""],
      "working_diagnosis": ["", Validators.compose([Validators.required])],
      "investigation_rquired": [""],
      "treatments": [""],
      "follow_up_plan": ["", Validators.compose([Validators.required])],
    })


  }
  

  Investigate() {


    this.recordValue = JSON.stringify(this.record.value);

    this.jsonBody = JSON.parse(this.recordValue);

    console.log("THIS IS THE Appoint raw values VALUES" + this.recordValue)
    console.log("THIS IS THE Appoint VALUES " + this.jsonBody)

    console.log("THIS IS THE clinical_complaints" + this.jsonBody.clinical_complaints)
    console.log("THIS IS THE clinical_examinations" + this.jsonBody.clinical_examinations)
    console.log("THIS IS THE working_diagnosis" + this.jsonBody.working_diagnosis)
    console.log("THIS IS THE investigation_rquired" + this.jsonBody.investigation_rquired)
    console.log("THIS IS THE treatments" + this.jsonBody.treatments)
    console.log("THIS IS THE follow_up_plan" + this.jsonBody.follow_up_plan)
    console.log("THIS IS THE follow_up_plan" + this.jsonBody.follow_up_plan)
    console.log("THIS IS THE patient_id " + this.requester_id)
    console.log("THIS IS THE doctor_id " + this.doc_id)

    this.params = {
      "confirmed_appointment_id" : this.confirmed_appointment_id,
      "doctor_id": this.doctor_id1,
      "patient_id": this.patient_id,
      "clinical_complaints": this.jsonBody.clinical_complaints,
      "clinical_examinations": this.jsonBody.clinical_examinations,
      "working_diagnosis": this.jsonBody.working_diagnosis,
      "investigation_rquired": this.jsonBody.investigation_rquired,
      "follow_up_plan": this.jsonBody.follow_up_plan,
      "treatments": this.jsonBody.treatments,
    }

    console.log(" patient new records this.params =  "+ JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();

    this.data1.investigation(this.params).then((result) => {

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
          title: "",
          subTitle: this.messageList,
          buttons: [
            { text: 'OK',
              handler: () => {
                this.events.publish('unattended_appointments:refreshpage');
                this.navCtrl.pop();
              }
            }
          ]
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
  }




  order() {

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    let alert = this.alertCtrl.create({
      title: '',
      subTitle: "Order Medication Module not ready",
      buttons: ['OK']
    });

    alert.present();
    loader.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}






