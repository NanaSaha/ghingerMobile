import { Component } from '@angular/core';

// import { DocgeneralhomecarePage } from '../docgeneralhomecare/docgeneralhomecare';
// import { DocgeneralmedicationPage } from "../docgeneralmedication/docgeneralmedication";
// import { DocgeneralvidconsultPage } from '../docgeneralvidconsult/docgeneralvidconsult';
import { DocgeneralmedicationlistsPage } from '../docgeneralmedicationlists/docgeneralmedicationlists';
import { DocgeneralvideoconsultlistsPage } from '../docgeneralvidconsultlists/docgeneralvidconsultlists';
import { DocgeneralhomecarelistsPage } from '../docgeneralhomecarelists/docgeneralhomecarelists';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';




@Component({
  templateUrl: 'doctor_general_appointments.html'
})
export class DoctorgeneralappointmentsTabsPage {

  public doc_md_gen_appoint_counter: any;
  public doc_hc_gen_appoint_counter: any;
  public doc_vc_gen_appoint_counter: any;

  public vc_doc_gen_appointment_count : any;
  public hc_doc_gen_appointment_count : any;
  public md_doc_gen_appointment_count : any;

  doctor_id: any;

  tab1Root = DocgeneralmedicationlistsPage;
  tab2Root = DocgeneralvideoconsultlistsPage;
  tab3Root = DocgeneralhomecarelistsPage;
  my_person_type : string;

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
    
    if (this.doctor_id) {
      this.getgeneralappointments(this.doctor_id);
    } else {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;

        this.getgeneralappointments(this.doctor_id);
      });
    }

  }

  ionViewWillEnter() {

    this.events.subscribe('doc_gen_appoint_counter:refreshpage', () => {

      if (this.doctor_id) {
        this.getgeneralappointments(this.doctor_id);
      } else {
        this.storage.get('doctor_id').then((doctor_id) => {
          this.doctor_id = doctor_id;
  
          this.getgeneralappointments(this.doctor_id);
        });
      }
      
    });


  }



  getgeneralappointments(data) {

    this.events.publish('doc_total_new_appoint_counter:refreshpage');

    if (data) {

      setTimeout(() => {

        this.data.get_new_general_appointments_count(data,this.my_person_type)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];

            if (jsonBody) {
              jsonBody = JSON.parse(jsonBody);

              if (jsonBody["vc_doc_gen_appointment_count"]) {
                if (jsonBody["vc_doc_gen_appointment_count"][0].counter) {
                  this.vc_doc_gen_appointment_count = jsonBody["vc_doc_gen_appointment_count"][0].counter;
                }
              }

              if (jsonBody["md_doc_gen_appointment_count"]) {
                if (jsonBody["md_doc_gen_appointment_count"][0].counter) {
                  this.md_doc_gen_appointment_count = jsonBody["md_doc_gen_appointment_count"][0].counter;
                }
              }

              if (jsonBody["hc_doc_gen_appointment_count"]) {
                if (jsonBody["hc_doc_gen_appointment_count"][0].counter) {
                  this.hc_doc_gen_appointment_count = jsonBody["hc_doc_gen_appointment_count"][0].counter;
                }
              }

              


              // this.storage.set("doc_new_gen_appoint_counter", JSON.stringify(this.doc_new_gen_appoint_counter));
            }

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }


}
