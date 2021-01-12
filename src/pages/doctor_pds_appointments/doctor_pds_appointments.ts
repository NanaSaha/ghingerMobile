import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { PrescriptionConsListPage } from '../prescription-cons-list/prescription-cons-list';
import { DocpdsphoneconsultlistsPage } from '../docpdsphoneconsultlists/docpdsphoneconsultlists';
import { DocpdsvideoconsultlistsPage } from '../docpdsvideoconsultlists/docpdsvideoconsultlists';
import { DocpdshomecareconsultlistsPage } from '../docpdshomecareconsultlists/docpdshomecareconsultlists';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import 'rxjs/add/operator/map';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'doctor_pds_appointments.html'
})
export class DoctorpdsappointmentsTabsPage {

  public pddp_doc_pds_appointment_count : any;
  public pdpc_doc_pds_appointment_count : any;
  public pdvc_doc_gen_appointment_count : any;
  public pdhc_doc_gen_appointment_count : any;
  my_person_type : string;

  doctor_id: any;

  tab1Root = PrescriptionConsListPage;
  tab2Root = DocpdsphoneconsultlistsPage;
  tab3Root = DocpdsvideoconsultlistsPage;
  tab4Root = DocpdshomecareconsultlistsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController, public toastCtrl: ToastController, public storage: Storage, public events: Events) {
    
    this.my_person_type = this.navParams.get('my_person_type');
    console.log("DoctorgeneralappointmentsTabsPage my_person_type = "+this.my_person_type);

    if (!this.my_person_type){
      this.storage.get('person_type').then((person_type) => {
        this.my_person_type = person_type
  
        console.log("---------------------------------------------------------")
  
        if (this.my_person_type) {
          console.log('Person Type VALUE IN DoctorgeneralappointmentsTabsPage = ' + this.my_person_type);
        }
      });
    }



  }

  ionViewWillEnter() {




  }



  getpdsappointments(data) {

    this.events.publish('doc_total_new_appoint_counter:refreshpage');

    if (data) {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {

        this.data.get_new_general_appointments_count(data,this.my_person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];

            if (jsonBody) {
              jsonBody = JSON.parse(jsonBody);


              if (jsonBody["pddp_doc_pds_appointment_count"]) {
                if (jsonBody["pddp_doc_pds_appointment_count"][0].counter) {
                  this.pddp_doc_pds_appointment_count = jsonBody["pddp_doc_pds_appointment_count"][0].counter;
                }
              }

              if (jsonBody["pc_doc_pds_appointment_count"]) {
                if (jsonBody["pc_doc_pds_appointment_count"][0].counter) {
                  this.pdpc_doc_pds_appointment_count = jsonBody["pc_doc_pds_appointment_count"][0].counter;
                }
              }

              if (jsonBody["pdvc_doc_pds_appointment_count"]) {
                if (jsonBody["pdvc_doc_pds_appointment_count"][0].counter) {
                  this.pdvc_doc_gen_appointment_count = jsonBody["pdvc_doc_pds_appointment_count"][0].counter;
                }
              }

              if (jsonBody["pdhc_doc_pds_appointment_count"]) {
                if (jsonBody["pdhc_doc_pds_appointment_count"][0].counter) {
                  this.pdhc_doc_gen_appointment_count = jsonBody["pdhc_doc_pds_appointment_count"][0].counter;
                }
              }

              // this.storage.set("doc_new_gen_appoint_counter", JSON.stringify(this.doc_new_gen_appoint_counter));
            }

            loading.dismiss();

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }
}
