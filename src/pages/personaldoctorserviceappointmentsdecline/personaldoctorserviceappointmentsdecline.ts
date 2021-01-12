import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController,Events } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
// // import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
// import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
// import {VidConsultPage} from "../vid-consult/vid-consult";
// import {VideoconsultdetailsPage} from "../videoconsultdetails/videoconsultdetails";
// import {HomeSearchPage} from "../home-search/home-search";
// import {HomecaredetailsPage} from "../homecaredetails/homecaredetails";
import { PersonaldoctorserviceappointmentlistsPage } from '../personaldoctorserviceappointmentlists/personaldoctorserviceappointmentlists';
// import { doctornewappointmentTabsPage } from '../doctornewappointment/doctornewappointment';
import { DocgeneralappointmentDetailsPage } from '../docgeneralappointmentdetails/docgeneralappointmentdetails';
import { PersonaldoctorserviceappointmentsPage } from '../personaldoctorserviceappointments/personaldoctorserviceappointments';
import { DocgeneralappointmentlistsPage } from '../docgeneralappointmentlists/docgeneralappointmentlists';

import { Storage } from '@ionic/storage';
import { doctornewappointmentTabsPage } from '../doctornewappointment/doctornewappointment';
@Component({
  selector: 'page-personaldoctorserviceappointmentsdecline',
  templateUrl: 'personaldoctorserviceappointmentsdecline.html',
})
export class PersonaldoctorserviceappointmentsDeclinePage {
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
  pds_appt_detail_id : any;
  my_params : any;
  appointment_id : any;
  pre_confirmed_id : any;
  doctor_id : any;

  public PerDocDeclineForm: any;
  date: any;
  minSelectabledate : any;
  page_from : any;
  person_type: string;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController, public navParams: NavParams, public completeTestService: CompleteTestService, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController,public toastCtrl: ToastController,public events: Events,public formBuilder: FormBuilder,public storage: Storage) {

    // console.log("We are in Home Care Consult Appointments History page");
    this.from_login = this.navParams.get('value');

    this.from_login2 = this.navParams.get('pers_value');
    this.from_login3 = this.navParams.get('doc_value');
    this.appointmentType = navParams.get("appointmentType");
    this.pds_appt_detail_id = navParams.get("pds_appt_detail_id");

    this.appointment_id = this.navParams.get("appt_id");
    this.pre_confirmed_id = this.navParams.get("pre_confirmed_id");
    this.page_from = this.navParams.get("page");
    this.person_type = this.navParams.get("person_type");
    // page : DocgeneralappointmentDetailsPage
    if(!this.person_type){
      this.storage.get('person_type').then((person_type) => {
        this.person_type = person_type
      });
    }

    this.storage.get('doctor_id').then((doctor_id) => {
      this.doctor_id = doctor_id;
      console.log(' PersonaldoctorserviceappointmentsDeclinePage page doctor_id = '+doctor_id);

    });

    // if(this.pds_appt_detail_id){
    //   this.getpdsappointment_details(this.pds_appt_detail_id);
    // }

    this.date=new Date();
    this.minSelectabledate = this.formatDate(this.date);

    this.PerDocDeclineForm = formBuilder.group({
      // applicationid: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      appointment_date : ['', Validators.compose([Validators.required])],
      decline_reason : ['', Validators.compose([Validators.maxLength(150)])],

    });



  }



  // get_pds_records()

  closeModal() {
    this.viewCtrl.dismiss();
  }

  decline(){

    // if(!this.person_type){
    //   this.storage.get('person_type').then((person_type) => {
    //     this.person_type = person_type
    //   });
    // }

    if(this.appointment_id){

      let alert = this.alertCtrl.create({
        title: "Ghinger",
        subTitle: "You are about to decline the selected appointment, do you want to continue?",
        buttons: [
          { text: 'NO',
            handler: () => {

              this.closeModal();

            }
          },{ text: 'YES',
            handler: () => {
              

              this.my_params = {
                "appt_id" : this.appointment_id,
                "pre_confirmed_id": this.pre_confirmed_id,
                "action" : "D",
                "available_date" : this.PerDocDeclineForm.value.appointment_date,
                "comment" : this.PerDocDeclineForm.value.decline_reason,
                "professional_id" :this.doctor_id,
                "person_type" : this.person_type
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
                    // this.gen_appt_details = jsonBody;
                    loading.dismiss();
                    console.log("Jsson body " +jsonBody);

                    var desc = jsonBody["resp_desc"];
                    // var code = jsonBody["resp_code"];
                    if(this.page_from == 'DocgeneralappointmentDetailsPage'){
                      let alert = this.alertCtrl.create({
                        title: "Ghinger",
                        subTitle: desc,
                        buttons: [
                          { text: 'OK',
                            handler: () => {
                              this.closeModal();
                              this.events.publish('doc_new_appoint_counter:refreshpage');
                              this.events.publish('doc_total_new_appoint_counter:refreshpage');
                              this.events.publish('docgeneralappointmentlists:refreshpage');
                              // doctornewappointmentTabsPage
                              // PersonaldoctorserviceappointmentlistsPage
                              this.navCtrl.push(doctornewappointmentTabsPage);
                            }
                          }
                        ]
                      });
                      alert.present();
                    }else if (this.page_from == 'PersonaldoctorserviceappointmentsPage'){

                      let alert = this.alertCtrl.create({
                        title: "Ghinger",
                        subTitle: desc,
                        buttons: [
                          { text: 'OK',
                            handler: () => {
                              this.closeModal();
                              this.events.publish('doc_new_appoint_counter:refreshpage');
                              this.events.publish('doc_total_new_appoint_counter:refreshpage');
                              this.events.publish('personaldoctorserviceappointmentlists:refreshpage');
                              // doctornewappointmentTabsPage
                              // PersonaldoctorserviceappointmentlistsPage
                              this.navCtrl.push(doctornewappointmentTabsPage);
                            }
                          }
                        ]
                      });
                      alert.present();

                    }

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
    // this.showalertmessage("Ghinger","This action cannot be taken at the moment.");

    //the desired action: show this prompt: You are about to accept the selected appointment, do you want to continue?
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

  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + (d.getDate()),
    year = d.getFullYear();

    console.log("year" + year + "and day = "+day);


      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      console.log("year" + year + "and day = "+day);

      return [year, month, day].join('-');
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
