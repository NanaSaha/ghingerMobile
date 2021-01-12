import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { PhoneConsultPage } from '../phone-consult/phone-consult';
import { VideoConsultPage } from '../video-consult/video-consult';
import { PersonalHomeCarePage } from '../personal-home-care/personal-home-care';
import { PrescriptionPage } from '../prescription/prescription';
import { VideoconsulthistoryPage } from "../videoconsulthistory/videoconsulthistory";
import { HomecarehistoryPage } from "../homecarehistory/homecarehistory";
import { PrescriptionConsListPage } from "../prescription-cons-list/prescription-cons-list";
import { PrescriptionhistoryPage } from "../prescriptionhistory/prescriptionhistory";
import { PhoneconsulthistoryPage } from "../phoneconsulthistory/phoneconsulthistory";
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-personal-wel',
  templateUrl: 'personal-wel.html',
})
export class PersonalWelPage {
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  surname: any;
  first_name: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];

  requester_id: any;
  data1: any = [];
  pdhc_patient_appointment_count: any;
  phoneconsult_appointment_count: any;
  pdvc_patient_appointment_count: any;
  pddp_patient_appointment_count: any;

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public storage : Storage,public data: DataProvider) {

    this.from_login = this.navParams.get('value')
    this.from_login_doc = this.navParams.get('doc_value')
    this.from_login_pers = this.navParams.get('pers_value');
    this.requester_id = this.navParams.get('requester_id');

    console.log('VALUE IN PERSONAL WELL CONSTRUCTOR IS' + this.from_login);
    console.log('VALUE IN TABS CONSTRUCTOR IS' + this.from_login_doc);


    this.from_login = this.navParams.get('value')

    if (this.from_login_doc) {
      this.body = this.from_login_doc; // this.body = Array.of(this.from_login_doc)
      this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);
      console.log("jsonBody = " + JSON.stringify(this.jsonBody));
      this.surname = this.jsonBody[0].surname
      this.first_name = this.jsonBody[0].other_names

      console.log("DOC NAME " + this.surname + this.first_name)

      this.getappointments_counts(this.requester_id);
    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalWelPage');
  }

  ionViewWillEnter() {

    // this.events.subscribe('doc_new_appoint_counter:refreshpage', () => {

    if (this.requester_id) {
      this.getappointments_counts(this.requester_id);
    } else {
      this.storage.get('requester_id').then((requester_id) => {
        this.requester_id = requester_id;
        console.log(' Docgeneralappointmentlists page requester_id = ' + requester_id);

        this.getappointments_counts(this.requester_id);
      });
    }

    // });

  }



  phone(appointmentType) {

    this.navCtrl.push(PhoneconsulthistoryPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, appointmentType: appointmentType });

   }


  video(appointmentType) {
    this.navCtrl.push(VideoconsulthistoryPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, appointmentType: appointmentType });
  


  }

  homecare(appointmentType) {

    this.navCtrl.push(HomecarehistoryPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, appointmentType: appointmentType });
    
  }


  prescription(appointmentType) {

       this.navCtrl.push(PrescriptionhistoryPage, { value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers, appointmentType: appointmentType, requester_id: this.requester_id });


  }


  getappointments_counts(data) {

    // this.events.publish('doc_total_new_appoint_counter:refreshpage');
    console.log(data);

    if (data) {

      setTimeout(() => {

        this.data.get_patients_appointments_count(data)
          .then(result => {
            console.log(result);
            var jsonBody = result["_body"];



            if (jsonBody) {
              jsonBody = JSON.parse(jsonBody);
              console.log("JSON BODY ON COUNT" + jsonBody);

              if (jsonBody["pdhc_patient_appointment_count"]) {
                this.pdhc_patient_appointment_count = jsonBody["pdhc_patient_appointment_count"];

                console.log(JSON.stringify(this.pdhc_patient_appointment_count));
                this.storage.set("pdhc_patient_appointment_count", JSON.stringify(this.pdhc_patient_appointment_count));

              } else {
                this.pdhc_patient_appointment_count = 0;
                this.storage.set("pdhc_patient_appointment_count", "");
              }

              if (jsonBody["pdpc_patient_appointment_count"]) {
                this.phoneconsult_appointment_count = jsonBody["pdpc_patient_appointment_count"];
                console.log("PHONE CONSULT COU+NSULT " + this.phoneconsult_appointment_count)
              } else {
                this.phoneconsult_appointment_count = 0;
              }

              if (jsonBody["pdvc_patient_appointment_count"]) {
                this.pdvc_patient_appointment_count = jsonBody["pdvc_patient_appointment_count"];
              } else {
                this.pdvc_patient_appointment_count = 0;
              }

              if (jsonBody["pddp_patient_appointment_count"]) {
                this.pddp_patient_appointment_count = jsonBody["pddp_patient_appointment_count"];
              } else {
                this.pddp_patient_appointment_count = 0;
              }
            }

            console.log("Jsson body " + jsonBody);
          }, (err) => {

            console.log("error = " + JSON.stringify(err));
          });

      }, 1);
    }

  }


}
