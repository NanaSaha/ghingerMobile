import { Component, ViewChild } from "@angular/core";
import {
  MenuController,
  NavController,
  NavParams,
  App,
  Events,
  Slides,
} from "ionic-angular";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import { MedAppointPage } from "../med-appoint/med-appoint";
import { PersonalWelPage } from "../personal-wel/personal-wel";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { LabHistoryPage } from "../lab-history/lab-history";
import { MedicationSearchPage } from "../medication-search/medication-search";
import { HomeSearchPage } from "../home-search/home-search";
import { DocHistoryPage } from "../doc-history/doc-history";
import { LocationPage } from "../location/location";
import { LoginPage } from "../login/login";
import { SearchPage } from "../search/search";
import { Search2Page } from "../search2/search2";
import { MedicationhistoryPage } from "../medicationhistory/medicationhistory";
import { LabSearchPage } from "../lab-search/lab-search";
import { DataProvider } from "../../providers/data/data";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { MedappointmentdetailsPage } from "../medappointmentdetails/medappointmentdetails";
import { Labhistory1Page } from "../labhistory1/labhistory1";
import { VideoconsulthistoryPage } from "../videoconsulthistory/videoconsulthistory";
import { HomecarehistoryPage } from "../homecarehistory/homecarehistory";
import { NotificationsPage } from "../notifications/notifications";
import { Storage } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { FeedbackPage } from "../feedback/feedback";

import { SubscriptionPage } from "../subscription/subscription";
import { SubscriptionForeignPage } from "../subscription-foreign/subscription-foreign";
import { CovidPage } from "../covid/covid";
import { SpecialistPage } from "../specialist/specialist";
import { MorePage } from "../more/more";

import { MedicalrecordPage } from "../medicalrecord/medicalrecord";
import { InsuranceformPage } from "../insuranceform/insuranceform";

const NOT_PERMITTED =
  "Please your account has not been verified. Kindly be patient. An agent would speak to you soon to get your account active!";
const NOT_PERMITTED2 =
  "You are not allowed to order for personal doctor service.";

@Component({
  selector: "page-menu",
  templateUrl: "menu.html",
})
export class MenuPage {
  @ViewChild("searchbar")
  searchbar: any;
  from_login: any = [];
  from_login_doc: any = [];
  from_login_pers: any = [];
  messageList: any;
  person_type_id: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  parsed_name: any;
  requester_id: any;
  patient_id: any;
  doc_id: any;
  doc_id1: any;
  doc_id2: any;
  data1: any = [];
  email: any;
  retrieve: string;
  retrieve1: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;
  body1: any;
  jsonBody1: any;
  person_type: any;
  person_type1: any;
  doctor_id: any;
  id: any;
  doctor_id2: any;
  doc_params: any = [];
  doc_params2: any = [];

  body2: any;
  retrieve2: any;
  jsonBody2: any;
  person_type2: any;
  doctor_id3: any;
  body3: any;
  retrieve3: any;
  jsonBody3: any;
  person_type3: any;
  body4: any;
  retrieve4: any;
  jsonBody4: any;
  body5: any;
  retrieve5: any;
  jsonBody5: any;

  myparams: any;
  newparams: any;
  appointment_statistics1: any = [];
  myjsonBody: any;
  string: any;
  from_regis_id: any = [];
  surname: string = "";
  other_names: string = "";
  full_name: string = "";

  medical_appointment_count: any;
  medication_appointment_count: any;

  labrequest_appointment_count: any;
  total_patient_pds_appointment_count: any;
  videoconsult_appointment_count: any;
  homecare_appointment_count: any;
  breakline_landscape: any;
  all_appointments_overall_total: any;
  user_details: any;
  from_login_orig;
  first_three_numbers;
  CurrentHrs;
  greetings;
  token;

  // @ViewChild(‘mySlider’)
  slides: Slides;

  catSlideOpts = {
    // freeMode: true,
    slidesPerView: 1.25,
    // slidesOffsetBefore: 11,
    spaceBetween: 10,
    centeredSlides: true,
  };

  constructor(
    // public slides: Slides,
    public event: Events,
    public app: App,
    public menuCtrl: MenuController,
    public data: DataProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private screenOrientation: ScreenOrientation
  ) {
    this.user_greetings();

    this.menuCtrl.enable(true);

    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });

    this.storage.get("value").then((value) => {
      this.from_login = value;
      console.log("FROM LOGIN VALYE " + JSON.stringify(this.from_login));
      this.event.publish("user_details", this.from_login);

      var results_body = JSON.parse(this.from_login);

      let user_mobile_number = results_body["data"]["user_infos"][0].phone;
      var role = results_body["data"]["role"]["id"];
      var user_id = results_body["data"]["user_infos"][0].user_id;
      this.surname = results_body["data"]["user_infos"][0].surname;
      this.other_names = results_body["data"]["user_infos"][0].first_name;
      this.email = results_body["data"]["email"];

      console.log("results_body " + JSON.stringify(results_body));
      console.log("user_mobile_number " + JSON.stringify(user_mobile_number));

      this.first_three_numbers = user_mobile_number.substring(0, 3);
      console.log("MOBILE NUMBER IS " + user_mobile_number);
      console.log("first_three_numbersIS " + this.first_three_numbers);

      this.jsonBody = this.from_login;

      if (results_body) {
        console.log("EMAIL  " + this.email);

        if (user_id) {
          this.requester_id = user_id;
          this.storage.set("requester_id", this.requester_id);
          console.log("requester ID = " + this.requester_id);

          //  this.getappointments_counts(this.requester_id);
        }
        if (this.surname && this.other_names) {
          this.storage.set(
            "patient_name",
            this.surname + " " + this.other_names
          );
        }
      }
    });

    // this.storage.get("doc_value").then((doc_value) => {
    //   this.from_login_doc = doc_value;

    //   console.log(
    //     "LOGIN DETAILS from LOGIN DOC IN MENU PAGE FOR CONSTRUCTOR IS" +
    //       this.from_login_doc
    //   );
    // });

    // this.storage.get("pers_value").then((pers_value) => {
    //   this.from_login_pers = pers_value;

    //   console.log(
    //     "LOGIN PERS VALUE IN MENU PAGE CONSTRUCTOR IS" + this.from_login_pers
    //   );
    //   console.log("this.from_login_pers = " + this.from_login_pers);
    //   this.body4 = this.from_login_pers;
    //   this.retrieve4 = this.body4;
    //   console.log("Padmore,Menu.ts line 153");

    //   this.jsonBody4 = this.retrieve4;
    //   console.log("Padmore,Menu.ts line 156");
    //   this.doc_id = this.jsonBody4[0].doctor_id;
    //   this.doc_id2 = this.jsonBody4[0].id;
    //   console.log("Padmore,Menu.ts line 159");
    //   this.person_type_id = this.jsonBody4[0].person_type_id;

    //   console.log(
    //     "Padmore,Menu.ts line 162 - person_type_id = " + this.person_type_id
    //   );

    //   console.log("VALUE of DOCTOR ID IN Menu  IS " + this.doc_id);
    //   console.log(
    //     "VALUE of DOCTOR ID FROM DOC MODULE IN Menu  IS " + this.doc_id2
    //   );
    //   console.log(
    //     "VALUE of PERSON TYPE VALUE IN Menu  IS " + this.person_type_id
    //   );
    // });

    // console.log(
    //   "-------------------------------BEGIN TEST-----------------------------------------------"
    // );
    // this.myparams = {
    //   requester_id: this.requester_id,
    // };

    // this.newparams = JSON.stringify(this.myparams);
    // console.log("line 185 - menu = newparams " + this.newparams);

    // console.log(
    //   "-------------------------------END TEST-----------------------------------------------"
    // );

    // console.log("VALUE from Login " + this.from_login);
    // console.log("VALUE from login-doc " + this.from_login_doc);
    // console.log("VALUE from login-person " + this.from_login_pers);
  }

  openMenu() {
    if (this.menuCtrl.isOpen()) {
      console.log("is open");
    }
    if (this.menuCtrl.isEnabled()) {
      console.log("is enabled");
    }

    this.menuCtrl.toggle();
    this.menuCtrl.open();
  }

  ionViewDidLoad() {
    // this.menuCtrl.enable(true);
    this.user_greetings();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);

    // if (this.requester_id) {
    //   this.getappointments_counts(this.requester_id);
    // } else {
    //   this.storage.get("requester_id").then((requester_id) => {
    //     if (requester_id) {
    //       this.requester_id = requester_id;
    //       console.log(
    //         " Docgeneralappointmentlists page requester_id = " + requester_id
    //       );
    //       this.getappointments_counts(this.requester_id);
    //     }
    //   });
    // }
  }

  specialists() {
    this.navCtrl.push(SpecialistPage, { token: this.token });
  }

  appointment_statistics() {
    console.log("newparams = " + this.newparams);
    this.myjsonBody = JSON.parse(this.newparams);

    this.data.appointment_statistics(this.myjsonBody).then((result) => {});
  }

  notifications() {
    this.navCtrl.push(NotificationsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      token: this.token,
    });
  }

  medical() {
    if (this.requester_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED,
        buttons: ["OK"],
      });
      alert.present();
    } else {
      this.navCtrl.push(Search2Page, {
        value: this.from_login,
        token: this.token,
      });
    }
  }

  more() {
    this.navCtrl.push(MorePage);
  }

  user_greetings() {
    this.CurrentHrs = new Date().getHours();
    console.log("HOURS " + this.CurrentHrs);

    if (this.CurrentHrs >= 1 && this.CurrentHrs <= 12) {
      this.greetings = "Good Morning";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 12 && this.CurrentHrs <= 16) {
      this.greetings = "Good Afternoon";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 16 && this.CurrentHrs <= 21) {
      this.greetings = "Good Evening";
      console.log(this.greetings);
    } else if (this.CurrentHrs >= 21 && this.CurrentHrs <= 24) {
      this.greetings = "Good Night";
      console.log(this.greetings);
    }
  }

  subscription(sub_type) {
    //this.slides.autoplayDisableOnInteraction = false;

    console.log("sub_type TYPE" + sub_type);
    console.log("this.first_three_numbers " + this.first_three_numbers);

    if (
      this.first_three_numbers == "233" ||
      this.first_three_numbers == "020" ||
      this.first_three_numbers == "050" ||
      this.first_three_numbers == "027" ||
      this.first_three_numbers == "026" ||
      this.first_three_numbers == "056" ||
      this.first_three_numbers == "057" ||
      this.first_three_numbers == "024" ||
      this.first_three_numbers == "054" ||
      this.first_three_numbers == "055" ||
      this.first_three_numbers == "023"
    ) {
      this.navCtrl.push(SubscriptionPage, {
        value: this.from_login,
        sub_type: sub_type,
        token: this.token,
      });
    } else {
      console.log("A FOREIGN NUMBER");

      this.navCtrl.push(SubscriptionPage, {
        value: this.from_login,
        sub_type: sub_type,
        token: this.token,
      });
      // this.navCtrl.push(SubscriptionForeignPage, {
      //   value: this.from_login,
      //   sub_type: sub_type,
      //   token: this.token,
      // });
    }
  }

  covid() {
    this.navCtrl.push(CovidPage, {
      value: this.from_login,
      token: this.token,
    });
  }

  medication() {
    console.log("TOKEN IS :: ", this.token);
    this.medication_appointment_count = 0;
    this.navCtrl.push(MedicationhistoryPage, {
      value: this.from_login,
      token: this.token,
    });
  }

  lab_history() {
    console.log("TOKEN IS :: ", this.token);
    this.navCtrl.push(Labhistory1Page, {
      value: this.from_login,
      token: this.token,
    });
  }

  not_ready() {
    let alert = this.alertCtrl.create({
      title: "GHINGER HEALTHCARE",
      subTitle: "This feature coming soon. Kindly check our other services",
      buttons: ["OK"],
    });
    alert.present();
  }

  doc_history() {
    if (this.requester_id == null) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED,
        buttons: ["OK"],
      });
      alert.present();
    }

    if (this.doc_id == null && this.person_type_id == "D") {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: NOT_PERMITTED2,
        buttons: ["OK"],
      });
      alert.present();
    }

    if (this.requester_id != null && this.person_type_id == "C") {
      let loader = this.loadingCtrl.create({
        content: "Please wait ...",
      });

      loader.present();

      console.log("THIS IS THE REquester ID " + this.requester_id);

      this.params = {
        requester_id: this.requester_id,
      };

      console.log("PARAMETERS" + this.params);

      this.data.check_patient_pds_status(this.params).then(
        (result) => {
          console.log("RESULTS IS " + result);

          var body = result["_body"];
          body = JSON.parse(body);
          this.check = body;
          console.log("RESULTS IS " + this.check);
          this.string = JSON.stringify(this.check);
          console.log("LETS SEE THE STRING " + this.string);

          this.jsonBody = JSON.parse(this.string);

          console.log("this.jsonBody[0].resp_code " + this.jsonBody.resp_code);

          console.log("pushing to locationpage");
          if (this.jsonBody.resp_code == "555") {
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: "Ghinger",
              subTitle: this.jsonBody.resp_desc,
              buttons: ["OK"],
            });
            alert.present();
          } else if (this.jsonBody.resp_code == "100") {
            loader.dismiss();

            this.navCtrl.push(LocationPage, {
              value: this.from_login,
              pers_value: this.from_login_pers,
              doc_value: this.from_login_doc,
              requester_id: this.requester_id,
              token: this.token,
            });
          } else if (this.jsonBody.resp_code == "000") {
            //doctor's records found. proceed to personal doctor welcome page.
            loader.dismiss();
            if (this.jsonBody.doc_records) {
              console.log("pushing to personalwelpage");

              this.navCtrl.push(PersonalWelPage, {
                value: this.from_login,
                doc_value: this.jsonBody.doc_records,
                pers_value: this.from_login_pers,
                requester_id: this.requester_id,
                token: this.token,
              });
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  check_pds_status() {
    console.log("THIS IS THE REquester ID " + this.requester_id);

    this.params = {
      requester_id: this.requester_id,
    };

    console.log("PARAMETERS" + this.params);

    this.data.check_patient_pds_status(this.params).then(
      (result) => {
        console.log("RESULTS IS " + result);

        var body = result["_body"];
        body = JSON.parse(body);
        this.check = body;
        console.log("RESULTS IS " + this.check);
        this.string = JSON.stringify(this.check);
        console.log("LETS SEE THE STRING " + this.string);

        this.jsonBody = JSON.parse(this.string);
        // this.sub_id = this.jsonBody[0].resp_code
        console.log("this.jsonBody[0].resp_code " + this.jsonBody.resp_code);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  video(appointmentType) {
    this.navCtrl.push(VideoconsulthistoryPage, {
      value: this.from_login,
      appointmentType: appointmentType,
      token: this.token,
    });
  }

  home(appointmentType) {
    this.navCtrl.push(HomecarehistoryPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      appointmentType: appointmentType,
      token: this.token,
    });
  }

  feedback() {
    this.navCtrl.push(FeedbackPage, {
      value: this.from_login,
      pers_value: this.from_login_pers,
      doc_value: this.from_login_doc,
      token: this.token,
    });
  }

  medicalRecord() {
    const prompt = this.alertCtrl.create({
      title: "Access Medical Record",
      message: "Enter your password to have access to your medical records",
      inputs: [
        {
          name: "Password",
          placeholder: "Password",
          type: "password",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Submit",
          handler: (data) => {
            console.log("Saved clicked");
            this.navCtrl.push(MedicalrecordPage);
          },
        },
      ],
    });
    prompt.present();
  }

  insurance() {
    // this.slides.autoplayDisableOnInteraction = false;
    this.navCtrl.push(InsuranceformPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      token: this.token,
    });
  }

  refresh() {}

  getappointments_counts(data) {
    // this.events.publish('doc_total_new_appoint_counter:refreshpage');
    console.log(data);

    if (data) {
      setTimeout(() => {
        this.data.get_patients_appointments_count(data).then(
          (result) => {
            console.log(result);
            var jsonBody = result["_body"];
            console.log("ALL APPOINTMENT FOR COUNT " + jsonBody);

            if (jsonBody) {
              jsonBody = JSON.parse(jsonBody);

              if (jsonBody["medical_appointment_count"]) {
                this.medical_appointment_count =
                  jsonBody["medical_appointment_count"];

                console.log(JSON.stringify(this.medical_appointment_count));
                this.storage.set(
                  "medical_appointment_count",
                  JSON.stringify(this.medical_appointment_count)
                );
              } else {
                this.medical_appointment_count = 0;
                this.storage.set("medical_appointment_count", "");
              }

              if (jsonBody["medication_appointment_count"]) {
                this.medication_appointment_count =
                  jsonBody["medication_appointment_count"];
              } else {
                this.medication_appointment_count = 0;
              }

              if (jsonBody["labrequest_appointment_count"]) {
                this.labrequest_appointment_count =
                  jsonBody["labrequest_appointment_count"];
              } else {
                this.labrequest_appointment_count = 0;
              }

              if (jsonBody["total_patient_pds_appointment_count"]) {
                this.total_patient_pds_appointment_count =
                  jsonBody["total_patient_pds_appointment_count"];
              } else {
                this.total_patient_pds_appointment_count = 0;
              }

              if (jsonBody["videoconsult_appointment_count"]) {
                this.videoconsult_appointment_count =
                  jsonBody["videoconsult_appointment_count"];
              } else {
                this.videoconsult_appointment_count = 0;
              }

              if (jsonBody["homecare_appointment_count"]) {
                this.homecare_appointment_count =
                  jsonBody["homecare_appointment_count"];
              } else {
                this.homecare_appointment_count = 0;
              }

              if (jsonBody["all_appointments_overall_total"]) {
                this.all_appointments_overall_total =
                  jsonBody["all_appointments_overall_total"];

                console.log(
                  "OVERALL APPOINTMENT " + this.all_appointments_overall_total
                );
              } else {
                this.all_appointments_overall_total = 0;
              }
            }

            console.log("Jsson body " + jsonBody);
          },
          (err) => {
            console.log("error = " + JSON.stringify(err));
          }
        );
      }, 1);
    }
  }
}
