import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
// import { Search2Page } from '../search2/search2';
// import { SearchPage } from '../search/search';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { PatientDetailsPage } from '../patient-details/patient-details';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';



@Component({
  selector: 'page-pdspatientdetails',
  templateUrl: 'pdspatientdetails.html',
})
export class PdspatientdetailsPage {

  currentpdspatientdetaildata = { id: 0,patient_id : '', surname: '', other_names: '', suburb_name: '', dob: '', requesturgency: '', prev_medical_history: '', complaint: '', prevmedicalhistory: '', allergies: '', source: '', confirmstatus: '', medications: '', created_at: '' };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  appointmentType: any;
  pdspatientdetails: any;
  doctor_id: any;
  patient_id: any;
  patient_params: any;
  newparams1: any;



  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {

    this.appointment_id = navParams.get("homecare_appoint_history_id")
    this.appointmentType = navParams.get("appointmentType")
    this.patient_id = navParams.get("patient_id")
    this.doctor_id = navParams.get("doctor_id")

    if (this.patient_id && this.doctor_id) {

      this.patient_params = {
        "patient_id": this.patient_id,
        "doctor_id": this.doctor_id
      }

      this.newparams1 = JSON.stringify(this.patient_params);

      console.log("this.newparams = " + this.newparams);
    }

    this.getCurrentpsdDetails();



    // this.jsonBody1 = JSON.parse(this.pdspatientdetails);
    // console.log("this.jsonBody1[0].surname = "+this.jsonBody1[0].surname);

    // // if (this.jsonBody1[0].patient_id !== null) {
    //   //   this.currenthomecareappointmentdetaildata.id = data["id"];
    // this.currentpdspatientdetaildata.surname = this.jsonBody1[0].surname;
    // this.currentpdspatientdetaildata.other_names = this.jsonBody1[0].other_names;
    // this.currentpdspatientdetaildata.suburb_name = this.jsonBody1[0].suburb_name;
    // this.currentpdspatientdetaildata.dob = this.jsonBody1[0].dob;
    // this.currentpdspatientdetaildata.allergies = this.jsonBody1[0].allergies;
    // this.currentpdspatientdetaildata.prev_medical_history = this.jsonBody1[0].prev_medical_history;
    // // this.currenthomecareappointmentdetaildata.medications = this.jsonBody1[0].medication;
    // // }


    // this.params = {
    //   "appointment_id": this.appointment_id,
    //   "appointment_type_id": this.appointmentType
    // }

    // this.newparams = JSON.stringify(this.params);

    // console.log("appointment_id = " + this.newparams);
    // this.getCurrentHomeCareDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home care appointment details Page');
  }


  getCurrentpsdDetails() {
    // console.log("medication_appoint_history_id = " + medication_appoint_history_id);

    if (this.newparams1) {
      this.jsonBody = JSON.parse(this.newparams1);

      if (this.jsonBody) {
        console.log("psd patient details this.newparams1 = " + this.newparams1 + "jsonBody = " + this.jsonBody);
      }


      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      setTimeout(() => {

        this.data.retrieve_pds_patient(this.jsonBody)
          .then(data => {
            console.log("data[\"_body\"] = " + data["_body"]);

            var body1 = data["_body"];
            body1 = JSON.parse(body1);

            this.retrieve1 = JSON.stringify(body1)
            // console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve1);

            this.body1 = Array.of(this.retrieve1)
            this.jsonBody1 = JSON.parse(this.body1);
            // console.log("medappointdetails page line 92 : this.jsonBody1[0].id = " + this.jsonBody1[0].id);

            //****************
            // loading.dismiss();

            if (this.jsonBody1[0].patient_id !== null) {
              //   this.currentmedappointmentdetaildata.id = data["id"];
              this.currentpdspatientdetaildata.patient_id = this.jsonBody1[0].patient_id;
              // this.currentpdspatientdetaildata.patient_id = this.jsonBody1[0].patient_id;
              this.currentpdspatientdetaildata.surname = this.jsonBody1[0].surname;
              this.currentpdspatientdetaildata.other_names = this.jsonBody1[0].other_names;
              this.currentpdspatientdetaildata.suburb_name = this.jsonBody1[0].suburb_name;
              this.currentpdspatientdetaildata.dob = this.jsonBody1[0].dob;
              this.currentpdspatientdetaildata.allergies = this.jsonBody1[0].allergies;
              this.currentpdspatientdetaildata.prev_medical_history = this.jsonBody1[0].prev_medical_history;
              this.currentpdspatientdetaildata.medications = this.jsonBody1[0].medication;
              loading.dismiss();

            }
            loading.dismiss();

          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");

            // this.toastCtrl.create({
            //   message: "Please ensure all details provided are correct.",
            //   duration: 5000
            // }).present();
            // loader.dismiss();
            console.log("error = " + JSON.stringify(err));
          });

        loading.dismiss();

      }, 1);
    }



  }

  new_record(patient_id,doctor_id){
    this.navCtrl.push(PatientNewRecordPage);
  }

  showrecords() {
    this.navCtrl.push(PatientDetailsPage);
    // PatientDetailsPage
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }

}
