import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import {VidConsultPage} from "../vid-consult/vid-consult";
import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
import {HomeSearchPage} from "../home-search/home-search";
import {HomecaredetailsPage} from "../homecaredetails/homecaredetails";
import { PersonaldoctorserviceappointmentlistsPage } from '../personaldoctorserviceappointmentlists/personaldoctorserviceappointmentlists';
import { doctornewappointmentTabsPage } from '../doctornewappointment/doctornewappointment';
import { PersonaldoctorserviceappointmentsDeclinePage } from '../personaldoctorserviceappointmentsdecline/personaldoctorserviceappointmentsdecline';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-personaldoctorserviceappointments',
  templateUrl: 'personaldoctorserviceappointments.html',
})
export class PersonaldoctorserviceappointmentsPage {
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
  pds_appt_detail : any;
  my_params : any;
  doctor_id : any;
  person_type : string;
  final_item_total : string;
  item_total = 0.0;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public events: Events,public storage: Storage) {

    // console.log("We are in Home Care Consult Appointments History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = navParams.get("appointmentType");
    this.pds_appt_detail = navParams.get("pds_appt_detail");

    if (!this.doctor_id) {
      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
      });
    }

    this.storage.get("person_type").then((person_type) => {
      this.person_type = person_type;
    });

    if(this.pds_appt_detail){
      
      this.pds_appointments = Array.of(this.pds_appt_detail);
      console.log(JSON.stringify(this.pds_appointments));
      
    }

  }



  // get_pds_records()

  closeModal() {
    this.viewCtrl.dismiss();
  }

  accept_pds_appt(appt_id,confirmed_id){

    if(appt_id){

      let alert = this.alertCtrl.create({
        title: "Ghinger",
        subTitle: "You are about to accept the selected appointment, do you want to continue?",
        buttons: [
          { text: 'NO',
            handler: () => {

              this.closeModal();

            }
          },{ text: 'YES',
            handler: () => {

              this.my_params = {
                "appt_id" : appt_id,
                "pre_confirmed_id": confirmed_id,
                "action" : "A",
                "professional_id": this.doctor_id,
                "person_type" : this.person_type,
              }

              let loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });

              loading.present();

              setTimeout(() => {
                this.data.new_doc_appointment_accept_decline(this.my_params)
                  .then(result => {

                    console.log(result);
                    var jsonBody = result["_body"];
                    jsonBody = JSON.parse(jsonBody);
                  
                    loading.dismiss();
                    console.log("Jsson body " +jsonBody);

                    var desc = jsonBody["resp_desc"];
                   

                    this.showalertmessage_modal("Ghinger", desc);
                  }, (err) => {

                    loading.dismiss();
                    this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
                    this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
                    console.log("error = "+JSON.stringify(err));
                  });

                }, 1);

            }
          }
        ]
      });
      alert.present();



    }
      }

  decline_pds_appt(appt_id,pre_confirmed_id){
    //make request to decline pds appt with id= appt_id
    this.closeModal();
    this.navCtrl.push(PersonaldoctorserviceappointmentsDeclinePage,{appt_id : appt_id, pre_confirmed_id: pre_confirmed_id,person_type: this.person_type, page : 'PersonaldoctorserviceappointmentsPage'});
    // this.showalertmessage("Ghinger","This action cannot be taken at the moment.");
  }


  getpdsappointment_details(appt_id) {

    if(appt_id){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        this.data.get_new_personaldoctorserviceappointments_details(appt_id)
          .then(result => {

            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.pds_appointments = jsonBody;
            loading.dismiss();

            console.log("Jsson body " +JSON.stringify(jsonBody));
          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Sorry. An Error occured. Kindly refresh and try again.");
            this.showmessage("Sorry. An Error occured. Kindly refresh and try again.");
            console.log("error = "+JSON.stringify(err));
          });

        }, 1);
    }

  }

  showmessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg){
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }


  showalertmessage_modal(titlemsg, mainmsg){
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: [
        { text: 'OK',
          handler: () => {
            this.closeModal();
            this.events.publish('personaldoctorserviceappointmentlists:refreshpage');
            this.events.publish('doc_total_new_appoint_counter:refreshpage');
            this.events.publish('doc_new_appoint_counter:refreshpage');
            this.events.publish('docgeneralappointmentlists:refreshpage');
            // doctornewappointmentTabsPage
            // PersonaldoctorserviceappointmentlistsPage
            // this.navCtrl.push(doctornewappointmentTabsPage);
          }
        }
      ]
    });
    alert.present();
  }


}
