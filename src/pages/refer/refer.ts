import { Component, ViewChild } from '@angular/core';
import { MenuController,NavController, NavParams, ViewController ,App} from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ReferpatientlistsPage } from '../referpatientlists/referpatientlists';



@Component({
  selector: 'page-refer',
  templateUrl: 'refer.html',
})
export class ReferPage {

  public referpatientForm: any;
  doctor_id : string;
  params2 : any;
  messageList : any;
  api_code : any;

 constructor(public _form: FormBuilder,public app: App,public menu: MenuController,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController,public modalCtrl: ModalController, public viewCtrl: ViewController,public storage: Storage,public events: Events) {

  // this.doctor_id = navParams.get("doctor_id");

  this.storage.get('doctor_id').then((doctor_id) => {
    this.doctor_id = doctor_id;
    console.log(' ReferPage page doctor_id = '+doctor_id);

  });

  this.referpatientForm = this._form.group({
      "patient_surname": ["", Validators.compose([Validators.required])],
      "patient_other_names": ["", Validators.compose([Validators.required])],
      "patient_dob": ["", Validators.compose([Validators.required])],
      "patient_number": ["", Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]{10,10}$')])],
    })

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  submit() {

    // let alert = this.alertCtrl.create({
    //   title: 'Ghinger',
    //   subTitle: "TRIAL REFER",
    //   buttons: [{ text: 'OK',
    //     handler: () => {
    //       // this.closeModal();
    //       // this.navCtrl.push(ReferpatientlistsPage,{
    //       //   doctor_id: this.doctor_id
    //       // });
    //
    //
    //       this.events.publish('ReferpatientlistsPage:refreshpage');
    //       this.closeModal();
    //
    //     }
    //   }]
    // });

    // this.storage.get('doctor_id').then((doctor_id) => {

      // this.doctor_id = doctor_id;
      // console.log('Your doctor_id is ', doctor_id);

      this.storage.get('doctor_id').then((doctor_id) => {
        this.doctor_id = doctor_id;
        console.log(' ReferPage page doctor_id = '+doctor_id);

      if(this.doctor_id){

        this.params2 = {
          "surname":  this.referpatientForm.value.patient_surname,
          "other_names": this.referpatientForm.value.patient_other_names,
          "dob": this.referpatientForm.value.patient_dob,
          "contact" : this.referpatientForm.value.patient_number,
          "refered_by" : this.doctor_id
        }

        if(this.params2){

          console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2))
          console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2))

          let loader = this.loadingCtrl.create({content: "Please wait ..."});
          loader.present();

          this.data.refer_patient(this.params2).then((result) => {

            console.log("THIS IS THE RESULT" + result);
            var jsonBody = result["_body"];
            console.log(jsonBody);

            jsonBody = JSON.parse(jsonBody);
            console.log(jsonBody);


            var desc = jsonBody["resp_desc"];
            var code = jsonBody["resp_code"];

            console.log(desc);
            console.log(code);

            this.messageList = desc;
            this.api_code = code;

            loader.dismiss();

            if (this.api_code == "000") {
              let alert = this.alertCtrl.create({
                title: 'Ghinger',
                subTitle: desc,
                buttons: [{ text: 'OK',
                  handler: () => {
                    // this.closeModal();
                    // this.navCtrl.push(ReferpatientlistsPage,{
                    //   doctor_id: this.doctor_id
                    // });
                    this.events.publish('ReferpatientlistsPage:refreshpage');
                    this.closeModal();

                  }
                }]
              });

              this.navCtrl.pop()

              alert.present();

            }


            // if (this.api_code == "555") {
            //   let alert = this.alertCtrl.create({
            //     title: '',
            //     subTitle: this.messageList,
            //     buttons: ['OK']
            //   });


            //   alert.present();
            // }


          }, (err) => {
            loader.dismiss();
            this.toastCtrl.create({
              message: "Could not process this request successfully.",
              duration: 5000
            }).present();

            console.log(err);
          });
        }
      }else{
        this.showalertmessage_default("Ghinger","Some data are missing. Kindly refresh the page and try again.");
      }




    });

  }


  showalertmessage_default(titlemsg, mainmsg){
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }




  //  book_appoint() {

  //   this.appointmentVal = JSON.stringify(this.appointForm.value);

  //   this.jsonBody = JSON.parse(this.appointmentVal);

  //   console.log("THIS IS THE Appoint raw values VALUES" + this.appointmentVal)
  //   console.log("THIS IS THE Appoint VALUES " + this.jsonBody)

  //   console.log("THIS IS THE Provider ID " + this.from_hosp)
  //   console.log("THIS IS THE REQUESTER ID" + this.requester_id)
  //   console.log("THIS IS THE PROPOSED TIME" + this.jsonBody.proposed_time)
  //    console.log("THIS IS SUBUR ID" + this.sub_id)
  //     console.log("THIS IS THE ALERGIES" + this.jsonBody.allergies)


  //   this.params = {
  //     "suburb_id": this.sub_id,
  //     "provider_id": this.from_hosp,
  //     "requester_id": this.requester_id,
  //     "requester_cat": this.jsonBody.requester_cat,
  //     "beneficiary_name": this.jsonBody.beneficiary_name,
  //     "req_urgency": this.jsonBody.req_urgency,
  //     "appointment_type_id": this.jsonBody.appointment_type_id,
  //     "proposed_date": this.jsonBody.proposed_date + " " + this.jsonBody.proposed_time,
  //     "complaint_desc": this.jsonBody.complaint_desc,
  //     "prev_medical_history": this.jsonBody.prev_medical_history,
  //     "allergies": this.jsonBody.allergies


  //   }



  //   let loader = this.loadingCtrl.create({
  //     content: "Please wait ..."

  //   });

  //   loader.present();


  //   this.data.appointment(this.params).then((result) => {

  //     console.log("THIS IS THE RESULT" + result);
  //     var jsonBody = result["_body"];
  //     console.log(jsonBody);

  //     jsonBody = JSON.parse(jsonBody);
  //     console.log(jsonBody)


  //     var desc = jsonBody["resp_desc"];
  //     var code = jsonBody["resp_code"];


  //     console.log(desc);
  //     console.log(code);

  //     this.messageList = desc;
  //     this.api_code = code;

  //     loader.dismiss();

  //     if (this.api_code == "000") {
  //       let alert = this.alertCtrl.create({
  //         title: "",
  //         subTitle: this.messageList,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }

  //   this.navCtrl.setRoot(MenuPage, { value: this.from_login,doc_value: this.from_login3,pers_value: this.from_login2 });
  //     //this.navCtrl.popToRoot()

  //   }, (err) => {
  //     loader.dismiss();
  //     this.toastCtrl.create({
  //       message: "Could not process this request successfully.",
  //       duration: 5000
  //     }).present();

  //     console.log(err);
  //   });
  // }


}
