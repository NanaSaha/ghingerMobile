import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { HomeSearchPage } from "../home-search/home-search";
import { HomecaredetailsPage } from "../homecaredetails/homecaredetails";
import { Storage } from '@ionic/storage';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { Pdsprescription } from '../pdsprescription/pdsprescription';

@Component({
  selector: 'page-docgeneralmedication',
  templateUrl: 'docgeneralmedication.html',
})
export class DocgeneralmedicationPage {
  @ViewChild('searchbar') myInput;
  @ViewChild('input')
  // searchbar: any;

  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  newparams: any;
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;

  requester_id1: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;
  pds_appointments: any = [];
  content: any = [];
  rowid: any;
  appointmentType: any;
  gen_med: any;
  general_medications: any;
  doctor_id: any;

  constructor(
    // private keyboard: Keyboard, 
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public storage: Storage) {

  
    this.gen_med = navParams.get("gen_med");
    // console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login);

    if (this.gen_med) {
      this.general_medications = Array.of(this.gen_med);
      
    }

    this.storage.get('doctor_id').then((doctor_id) => {

      this.doctor_id = doctor_id;

      if (this.doctor_id) {

      }

    });

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  attend_to(appt_id) {
  

    console.log("this.gen_med = " + JSON.stringify(this.gen_med) + " and appt_id = " + JSON.stringify(appt_id));


    if (this.gen_med) {

      var full_name = this.gen_med.surname + " " + this.gen_med.other_names;

      if (this.gen_med.id && this.gen_med.patient_id && full_name && this.doctor_id) {

        if (this.gen_med.appointment_type == "Personal Doctor Digital Prescription") {
          this.navCtrl.popToRoot();
          this.navCtrl.popToRoot();
          this.navCtrl.push(Pdsprescription, { 'appointment_id': this.gen_med.id, 'patient_id': this.gen_med.patient_id, 'full_name': full_name,'beneficiary_age':this.gen_med.beneficiary_age,'email':this.gen_med.email,  'doc_id': this.doctor_id })

        } else {
          // this.viewCtrl.dismiss();
          this.navCtrl.popToRoot();
          this.navCtrl.popToRoot();
          this.navCtrl.push(PatientNewRecordPage, { 'appointment_id': this.gen_med.id, 'patient_id': this.gen_med.patient_id, 'full_name': full_name, 'doc_id': this.doctor_id })

        }


      }

    }

      }



  getdocgenmedicationdetail(med_id) {

    if (med_id) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        this.data.get_general_appointments_medication_details(med_id)
          .then(result => {

            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.general_medications = jsonBody;
            loading.dismiss();

            console.log("Jsson body " + JSON.stringify(jsonBody));
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
            this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }


  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
