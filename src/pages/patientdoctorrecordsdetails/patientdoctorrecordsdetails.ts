import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-patientdoctorrecordsdetails',
  templateUrl: 'patientdoctorrecordsdetails.html',
})
export class PatientdoctorrecordsdetailsPage {

  currentphoneconsultdetail: any;
  currentphoneconsultdetaildata = { id: 0, location: '', serviceprovider: '', requestcategory: '', beneficiary: '', requesturgency: '', proposeddateandtime: '', complaint: '', prevmedicalhistory: '', allergies: '', source: '', confirmstatus: '', medications: '', duration: '', created_at: '', beneficiary_phone_number: '' };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  appointmentType: any;
  doctor_patient_records: any;
  doctor_patient_records1 : any;
  jsonBodycurrentphoneconsultdetail: any;


  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {

    this.doctor_patient_records1 = navParams.get("doctor_patient_records")
      
    if(this.doctor_patient_records1){
      this.doctor_patient_records = this.doctor_patient_records1;

      // this.doctor_patient_records = Array.of(this.doctor_patient_records1);
      // this.getdocgenmedicationdetail(this.gen_med_id);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Current Phone Consult details Page');
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

}
