import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientNewRecordPage } from '../patient-new-record/patient-new-record';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { RecordPage } from '../record/record';
import { MenuPage } from '../menu/menu';
import { RemovehtmltagsPipe } from '../../pipes/removehtmltags/removehtmltags';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Placeorderforpatient } from '../placeorderforpatient/placeorderforpatient';
import { UnattendedappointmentsPage } from '../unattendedappointments/unattendedappointments';



@Component({
  selector: 'page-patient-details',
  templateUrl: 'patient-details.html',
  //pipes: [RemovehtmltagsPipe]
})
export class PatientDetailsPage {
  from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  doctor_id: any;
  requester_id: any;
  // data: any = [];
  data1: any;
  data2: any;
  body2: any;
  dob: any;
  phm: any;
  doc_details: any;
  retrieve: any;
  retrieve_alt: any;
  records: any;
  records1: any;
  date: any;
  to_menu; any;
  reg_id: any;
  patient_id : any;
  newparams1 : any;
  patient_params : any;
  doctor_id1: any;

  retrieve1 : any;
  body1 : any;
  jsonBody1 : any;

  other_names : string;
  surname : string;
  mobile_number : string;
  unattended_appointments_count: any;
  nodata_msg: any;

  constructor(public modalCtrl: ModalController, public data: DataProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.check = this.navParams.get('value')
    this.data2 = this.navParams.get('user_data')
    this.doc_details = this.navParams.get('doc_details')
    this.retrieve = this.navParams.get('retrieve')

    this.patient_id = this.navParams.get('patient_id');
    console.log("patient_id = "+this.patient_id);
    this.doctor_id1 = this.navParams.get('doctor_id');
    console.log('VALUE IN PATIENT DETAIL CONSTRUCTOR IS' + JSON.stringify(this.check));
    console.log('VALUE IN PATIENT DETAIL CONSTRUCTOR STRINGIFIED IS' + JSON.stringify(this.check));
    console.log("Value of User data in patient details page is " + [this.data2])
    console.log("Value of User data in patient details page is STRINGIFIED" + JSON.stringify(this.data2))
    console.log("Value of DOC details in patient details page is " + this.doc_details)
    console.log("Value of doc_details in patient details page is STRINGIFIED" + JSON.stringify(this.doc_details))
    console.log("Value of retieve order inves in patient details page" + this.retrieve)
    
    if(this.retrieve){
      console.log("Value of retieve order inves parse in patient details page" + JSON.parse(this.retrieve))
    }

    //  let to_menu = []; 
    console.log("patiend-details before this.retrieve")
    if (this.retrieve) {
      this.records1 = JSON.parse(this.retrieve)
    }



    if (this.patient_id && this.doctor_id1) {

      this.patient_params = {
        "patient_id": this.patient_id,
        "doctor_id": this.doctor_id1
      }

      this.newparams1 = JSON.stringify(this.patient_params);
    }

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
            this.body1 = Array.of(this.retrieve1)
            this.jsonBody1 = JSON.parse(this.body1);
           
            loading.dismiss();
            
            if (this.jsonBody1[0].reg_id) {
              this.reg_id = this.jsonBody1[0].reg_id;
            }

            
                this.requester_id = this.patient_id
                
          
                
                this.params = {
                  "requester_id": this.requester_id,
                  "patient_id": this.patient_id,
                  "doctor_id": this.doctor_id1,
                  "action": "fetch_personal_doctor_and_retrieve_investigation"
                }

              

                console.log("retrieve_investigation patient_id = "+this.patient_id + " this.doctor_id1 = "+this.doctor_id1);

                if(this.patient_id && this.doctor_id1){

                  this.data.retrieve_investigation(this.params).then((result) => {
          
                    var body = result["_body"];
                    body = JSON.parse(body);
            
                    this.retrieve = body
                    this.retrieve = JSON.stringify(body)
            
                    console.log('-----------------------------------------------------');
                    console.log('-----------------retrieve_investigation - THIS IS A LOG IN RETRIEVAL------------------------------------');
                    console.log('LETS SEE THE  BODY ' + body);
                    console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieve);
                    console.log('-----------------------------------------------------');
            
                    this.records = JSON.parse(this.retrieve)
                    this.body = Array.of(this.retrieve)
                    this.jsonBody = JSON.parse(this.body);
            
            
                    var desc = body["resp_desc"];
                    var code = body["resp_code"];
            
                    console.log('-----------------RESP CODE------------------------------------');
                    console.log(desc);
                    console.log(code);
            
                    this.messageList = desc;
                    this.api_code = code;
                    console.log('-----------------------------------------------------');
                    
                    // loading.dismiss();
            
                  });
                }
                

            if (this.jsonBody1[0].patient_id) {
              this.patient_id = this.jsonBody1[0].patient_id;
             
              this.surname = this.jsonBody1[0].surname;
              this.other_names = this.jsonBody1[0].other_names;
              
              this.dob = this.jsonBody1[0].dob;
              this.location = this.jsonBody1[0].suburb_name;
              
              this.phm = this.jsonBody1[0].prev_medical_history;
              

            }
           

          }, (err) => {

            loading.dismiss();
            this.showalertmessage("Ghinger", "Please ensure all details provided are correct.");

          
            console.log("error = " + JSON.stringify(err));
          });

        // loading.dismiss();

      }, 1);
    }
  }



  ionViewWillEnter() {
    // this.getappointments();
    this.get_confirmed_appointments_count(this.patient_id);
  }




  get_confirmed_appointments_count(patient_id) {

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    setTimeout(() => {

    this.data.get_confirmed_appointments_by_patient_count(patient_id)
      .then(result => {
        // this.contacts = result;
        

        var jsonBody = result["_body"];
        console.log(JSON.stringify(jsonBody));
        jsonBody = JSON.parse(jsonBody);
        if(jsonBody["record_count"]){
          console.log(jsonBody["resp_code"]);
          if(jsonBody["resp_code"]){
            if(jsonBody["resp_code"]== "000"){
              this.unattended_appointments_count = jsonBody["record_count"];
            }
          }
        }
        else{
          this.nodata_msg = jsonBody["resp_desc"];
        }
        
        loader.dismiss();

        console.log("Jsson body " + JSON.stringify(jsonBody));
      }, (err) => {

        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "An Error Occured. Please try again.",
          buttons: ['OK']
        });
        alert.present();

        loader.dismiss();
        console.log(err);
      });

    }, 1);



  }



  create(patient_id) {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();
    loader.dismiss();
    console.log("this.doctor_id1 = "+this.doctor_id1 + " patient_id = "+patient_id);
    this.navCtrl.push(UnattendedappointmentsPage, {'action' : 'Create Patient Record','doctor_id': this.doctor_id1, 'patient_id': patient_id})
    // this.navCtrl.push(PatientNewRecordPage, { 'value': this.check, "user_data": this.retrieve1, 'doc_details': this.doc_details, 'doc_id':this.doctor_id1, 'retrieve': this.retrieve })
  }


  order() {

    // this.navCtrl.push(MenuPage, { 'value': this.retrieve_alt, "pers_value": this.doc_details, 'doc_value': this.to_menu })

    

    this.navCtrl.push(Placeorderforpatient, {'doc_id':this.doctor_id1, 'patient_id': this.patient_id, 'patient_name': this.surname + " " + this.other_names});

  }


  open(item) {

    console.log("LEts see item in open fucntion " + JSON.stringify(item))

    let modal = this.modalCtrl.create(RecordPage, {

      'value': this.check, "user_data": this.data2, 'doc_details': this.doc_details, 'retrieve': this.retrieve, 'item_list': item
    }

    );

    modal.present();
  }



  // by PADMORE - If I get the basic data of the patient, I then collect the other things.
  getCurrentpsdDetails() { 
    // console.log("medication_appoint_history_id = " + medication_appoint_history_id);
    if (this.patient_id && this.doctor_id1) {

      this.patient_params = {
        "patient_id": this.patient_id,
        "doctor_id": this.doctor_id1
      }

      this.newparams1 = JSON.stringify(this.patient_params);
    }

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
            this.body1 = Array.of(this.retrieve1)
            this.jsonBody1 = JSON.parse(this.body1);
            // console.log("medappointdetails page line 92 : this.jsonBody1[0].id = " + this.jsonBody1[0].id);

            //****************
            // loading.dismiss();
            
            if (this.jsonBody1[0].reg_id) {
              this.reg_id = this.jsonBody1[0].reg_id;
            }

            if (this.jsonBody1[0].patient_id) {
              //   this.currentmedappointmentdetaildata.id = data["id"];
              // this.currentpdspatientdetaildata.patient_id = this.jsonBody1[0].patient_id;
              // // this.currentpdspatientdetaildata.patient_id = this.jsonBody1[0].patient_id;
              // this.currentpdspatientdetaildata.surname = this.jsonBody1[0].surname;
              // this.currentpdspatientdetaildata.other_names = this.jsonBody1[0].other_names;
              // this.currentpdspatientdetaildata.suburb_name = this.jsonBody1[0].suburb_name;
              // this.currentpdspatientdetaildata.dob = this.jsonBody1[0].dob;
              // this.currentpdspatientdetaildata.allergies = this.jsonBody1[0].allergies;
              // this.currentpdspatientdetaildata.prev_medical_history = this.jsonBody1[0].prev_medical_history;
              // this.currentpdspatientdetaildata.medications = this.jsonBody1[0].medication;
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

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }


}
