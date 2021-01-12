import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";
import { Observable } from "rxjs/Rx";

@Injectable()
export class DataProvider {
  // data1: any;

  constructor(public http: Http) {
    console.log("Hello DATAProvider Provider");
  }

  timeout_value = 20000;

  main_url = "https://api.ghingerhealth.com";

  try_login_url = this.main_url + "/prepare_login";
  update_profile_url = this.main_url + "/update_user_profile";
  payment_history_url = this.main_url + "/payment_history";
  subscription_history_url = this.main_url + "/subscription_history";
  subscription_history_for_doc_url =
    this.main_url + "/subscription_history_for_doc";

  make_remarks_url = this.main_url + "/make_remarks";

  new_gen_appoint_url = "";

  hosp_url = this.main_url + "/hospital";
  signup_url = this.main_url + "/sign_up";
  update_regis_url = this.main_url + "/update_registration";
  login_url = this.main_url + "/login";
  retrieve_url = this.main_url + "/retrieve_regis";
  retrieve_edit_url = this.main_url + "/retrieve_edit";
  retrieve_url1 = this.main_url + "/retrieve_regis1";
  retrieve_alt_url = this.main_url + "/retrieve_alt";
  retrieve_pers_url = this.main_url + "/retrieve_doc";
  retrieve_doc_url = this.main_url + "/retrieve_doc2";
  appoint_url = this.main_url + "/make_appointment";
  doc_appoint_url = this.main_url + "/doc_request";
  phone_consult_url = this.main_url + "/phone_consult";
  prescription_url = this.main_url + "/prescription";
  retrieve_phone_cons_url = this.main_url + "/doctor_patient";
  retrieve_video_cons_url = this.main_url + "/doctor_patient2";
  retrieve_home_cons_url = this.main_url + "/doctor_patient3";
  retrieve_accepts_url = this.main_url + "/doctor_patient4";
  retrieve_pds_patient_url = this.main_url + "/find_patient_details_pds";
  prescription_list_url = this.main_url + "/prescription_list";
  l_appoint_url = this.main_url + "/lab_appointment";
  send_feedback_url = this.main_url + "/give_feedback";
  specialty_masters_url = this.main_url + "/specialty_masters";
  professional_groups_url = this.main_url + "/professional_groups";
  get_professional_info_url = this.main_url + "/verify_professional_info";

  medication_url = this.main_url + "/medication";
  medication_history_url = this.main_url + "/medication_appointment_history";
  medication_detail_url =
    this.main_url + "/medication_appointment_history_details";

  getMedicationPreConfirmed_url =
    this.main_url + "/medication_confirmed_appt_details";

  getLabPreConfirmed_url = this.main_url + "/lab_confirmed_appt_details";

  getMedicalPreConfirmed_url =
    this.main_url + "/medical_confirmed_appt_details";

  video_consult_history_url =
    this.main_url + "/video_consult_appointment_history";
  video_consult_details_url =
    this.main_url + "/video_consult_appointment_detail";
  lab_appointment_history_url = this.main_url + "/lab_appointment_history";
  lab_appointment_detail_url = this.main_url + "/lab_appointment_detail";

  home_care_appointment_url = this.main_url + "/homecare";
  home_care_appointment_history_url =
    this.main_url + "/homecare_appointment_history";
  home_care_appointment_detail_url =
    this.main_url + "/homecare_appointment_detail";

  appoint_history_url = this.main_url + "/appointment_history";

  med_appoint_history_url = this.main_url + "/medical_appointment_history";
  med_appoint_detail_url = this.main_url + "/medical_appointment_detail";

  personal_doc_appoint_history_url =
    this.main_url + "/personal_doc_appointment_history";
  lab_service_url = this.main_url + "/lab_services";
  drug_service_url = this.main_url + "/drugs_services";
  investigation_url = this.main_url + "/order_investigation";
  retrieve_investigation_url = this.main_url + "/retrieve_order_investigation";

  appointments_statistics_url = this.main_url + "/pre_appointments/statistics";
  personal_doctor_prescription_history_url =
    this.main_url + "/personal_doctor_prescription_history";
  personal_doctor_prescription_detail_url =
    this.main_url + "/personal_doctor_prescription_history_details";

  phone_consult_history_url = this.main_url + "/phone_consult_history";
  phone_consult_details_url = this.main_url + "/phone_consult_history_details";
  refer_patient_url = this.main_url + "/refer_patient";
  patients_referred_url = this.main_url + "/get_patients_referred";

  get_new_general_appointments_url =
    this.main_url + "/get_new_general_appointments";
  get_new_personaldoctorserviceappointments_url =
    this.main_url + "/get_new_personaldoctorserviceappointments";
  get_personaldoctorconfirmedearnings_url =
    this.main_url + "/get_confirmed_appointments_by_doctor";
  get_general_appointments_medication_url =
    this.main_url + "/get_general_appointments_medication";
  get_general_appointments_videoconsult_url =
    this.main_url + "/get_general_appointments_videoconsult";
  get_general_appointments_homecare_url =
    this.main_url + "/get_general_appointments_homecare";
  get_doc_pds_appointments_prescription_url =
    this.main_url + "/get_doc_pds_appointments_prescription";
  get_doc_pds_appointments_phoneconsult_url =
    this.main_url + "/get_doc_pds_appointments_phoneconsult";
  get_doc_pds_appointments_videoconsult_url =
    this.main_url + "/get_doc_pds_appointments_videoconsult";
  get_doc_pds_appointments_homecare_url =
    this.main_url + "/get_doc_pds_appointments_homecare";

  get_new_general_appointments_details_url =
    this.main_url + "/get_new_general_appointments_details";
  get_new_personaldoctorserviceappointments_details_url =
    this.main_url + "/get_new_personaldoctorserviceappointments_details";
  get_general_appointments_medication_details_url =
    this.main_url + "/get_general_appointments_medication_details";
  get_general_appointments_videoconsult_details_url =
    this.main_url + "/get_general_appointments_videoconsult_details";
  get_general_appointments_homecare_details_url =
    this.main_url + "/get_general_appointments_homecare_details";
  get_doc_pds_appointments_prescription_details_url =
    this.main_url + "/get_doc_pds_appointments_prescription_details";
  get_doc_pds_appointments_phoneconsult_details_url =
    this.main_url + "/get_doc_pds_appointments_phoneconsult_details";
  get_doc_pds_appointments_videoconsult_details_url =
    this.main_url + "/get_doc_pds_appointments_videoconsult_details";
  get_doc_pds_appointments_homecare_details_url =
    this.main_url + "/get_doc_pds_appointments_homecare_details";

  new_doc_appointment_accept_decline_url =
    this.main_url + "/new_doc_appointment_accept_decline";

  get_new_general_appointments_count_url =
    this.main_url + "/get_new_appointments_count";

  get_patients_appointments_count_url =
    this.main_url + "/get_patient_appointments_count";

  get_appointment_types_url = this.main_url + "/appointment_types";

  get_appointment_types1_url = this.main_url + "/appointment_types1";

  get_service_providers_url = this.main_url + "/get_service_providers";
  get_confirmed_appointments_by_patient_url =
    this.main_url + "/get_confirmed_appointments_by_patient";

  get_confirmed_appointments_by_patient_count_url =
    this.main_url + "/get_confirmed_appointments_by_patient_count";

  check_patient_pds_status_url = this.main_url + "/check_patient_pds_status";

  get_countries_url = this.main_url + "/get_countries";

  get_regions_by_country_url = this.main_url + "/get_regions_by_country";

  // get_cities_by_region_url = this.main_url + "/get_cities_by_region";
  get_cities_by_region_url = this.main_url + "/get_all_cities";
  get_all_suburbs_url = this.main_url + "/get_all_suburbs";

  get_suburbs_by_city_url = this.main_url + "/get_suburbs_by_city";

  reset_password_get_phonenumber_url =
    this.main_url + "/reset_password_get_phonenumber";

  reset_password_get_smscode_url =
    this.main_url + "/reset_password_get_reset_token";

  reset_password_new_password_url =
    this.main_url + "/reset_password_new_password";

  read_appointment_url = this.main_url + "/read_appointment";

  versionCheckUrl = this.main_url + "/version_check";

  versionsCheckUrl = this.main_url + "/all_versions_check";

  attend_to_pds_prescription_url =
    this.main_url + "/attend_to_pds_prescription";

  upload_image_url = this.main_url + "/saveImage";

  bill_details_url = this.main_url + "/bill_details";

  accept_or_reject_bill_url = this.main_url + "/accept_or_reject_bill";

  make_payment_url = this.main_url + "/make_payment";
  make_payment_card_url = this.main_url + "/make_payment_card";

  retrieve_service_prices_url = this.main_url + "/retrieve_service_prices";

  book_subscription_url = this.main_url + "/book_subscription";
  retrieve_subscription_id_url = this.main_url + "/retrieve_subscription_id";
  subscription_history_details_url =
    this.main_url + "/subscription_history_details";

  data1: any = [];

  //SUBSCRIPTION APIS
  book_subscription(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.book_subscription_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  subscription_history(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.subscription_history_url, JSON.stringify(data))
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  subscription_history_for_doc(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.subscription_history_for_doc_url, JSON.stringify(data))
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  make_remarks(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.make_remarks_url, JSON.stringify(data)).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  subscription_history_details(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.subscription_history_details_url, JSON.stringify(data))
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  //END SUBSCRIPTION APIS

  payment_history(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.payment_history_url, JSON.stringify(data)).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  try_login(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.try_login_url, JSON.stringify(data))
        // .timeout(this.timeout_value)
        .timeoutWith(5000, Observable.throw(new Error("Error message")))

        //   .catch(err => {

        //     if (err.name !== "TimeoutError") {
        //        return Observable.throw("Timeout has occurred");
        //     }

        //     return Observable.throw(err);

        //  })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  update_profile(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.update_profile_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrive_service_price(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_service_prices_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  hospitals(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.hosp_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  registration(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.signup_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  update_registration(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.update_regis_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  ghinger_login(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.login_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_edit(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_edit_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve1(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_url1, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_alt(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_alt_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_pers(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_pers_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_doc(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_doc_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  appointment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.appoint_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  doc_appointment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.doc_appoint_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  phone_consult(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.phone_consult_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  prescription_list(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.prescription_list_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  prescription(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.prescription_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  l_appointment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.l_appoint_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  send_feedback(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.send_feedback_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  medication(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.medication_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  homecare_appointment(data) {
    console.log(
      "homecare appointment data in data.ts line 250 = " + JSON.stringify(data)
    );
    return new Promise((resolve, reject) => {
      this.http
        .post(this.home_care_appointment_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  investigation(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.investigation_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_investigation(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_investigation_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  appointment_statistics(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.appointments_statistics_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  appointment_history(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.appoint_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  med_appointment_history(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.med_appoint_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        // .timeoutWith(5, Observable.throw(new Error("Error message")))
        // .timeoutWith(5,Observable.throw(reject("Timeout occured")))
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getCurrentMedAppointmentdetails(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.med_appoint_detail_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  getMedicationHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.medication_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  getMedicationDetails(data) {
    // console.log("stringify(data) =" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http
        .post(this.medication_detail_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getMedicationPreConfirmed(data) {
    // console.log("stringify(data) =" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http
        .post(this.getMedicationPreConfirmed_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getLabPreConfirmed(data) {
    // console.log("stringify(data) =" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http
        .post(this.getLabPreConfirmed_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getMedicalPreConfirmed(data) {
    // console.log("stringify(data) =" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http
        .post(this.getMedicalPreConfirmed_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getVideoConsultHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.video_consult_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getVideoConsultDetails(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.video_consult_details_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getLabAppointmentHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.lab_appointment_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getLabAppointmentDetail(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.lab_appointment_detail_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getHomeCareAppointmentHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.home_care_appointment_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getHomeCareAppointmentDetails(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.home_care_appointment_detail_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPhoneConsultHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.phone_consult_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPhoneConsultHistoryDetails(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.phone_consult_details_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPersonalDoctorPrescriptionHistory(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          this.personal_doctor_prescription_history_url,
          JSON.stringify(data)
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getPersonalDoctorPrescriptionDetails(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          this.personal_doctor_prescription_detail_url,
          JSON.stringify(data)
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  personal_doc_appointment_history(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.personal_doc_appoint_history_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_phone_consult(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_phone_cons_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_video_consult(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_video_cons_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_home_consult(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_home_cons_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_accepted_appointment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_accepts_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_lab_services() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.lab_service_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_drug_services() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.drug_service_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_countries() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_countries_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_regions_by_country(data) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${this.get_regions_by_country_url}?country_id=${JSON.stringify(
            data
          )}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_regions_by_country_url res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // get_cities_by_region(data) {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(`${this.get_cities_by_region_url}?region_id=${JSON.stringify(data)}`).timeout(this.timeout_value)
  //       .subscribe(res => {
  //         console.log("get_cities_by_region_url res = " + JSON.stringify(res));
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  get_all_suburbs() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_all_suburbs_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_cities_by_region() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_cities_by_region_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_suburbs_by_city(data) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.get_suburbs_by_city_url}?city_id=${JSON.stringify(data)}`)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log("get_suburbs_by_city_url res = " + JSON.stringify(res));
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_appointment_types() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_appointment_types_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_appointment_types1() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_appointment_types1_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_service_providers() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.get_service_providers_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_specialties() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.specialty_masters_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_professional_groups() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.professional_groups_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_professional_info(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.get_professional_info_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  retrieve_pds_patient(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_pds_patient_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  refer_patient(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.refer_patient_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  get_patients_referred(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_patients_referred line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(`${this.patients_referred_url}?doc_id=${JSON.stringify(data)}`)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_getlicense_types_filter res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(JSON.stringify(err));
          }
        );
    });
  }

  get_new_general_appointments(data, my_person_type) {
    return new Promise((resolve, reject) => {
      console.log(`my_person_type = ${my_person_type}`);
      // if (my_person_type) {
      //   switch (my_person_type) {
      //     case "D":
      //       this.new_gen_appoint_url = `${this.get_new_general_appointments_url}?doc_id=${JSON.stringify(data)}&person_type=${my_person_type}`
      //       break;
      //     case "N":
      //     this.new_gen_appoint_url = `${this.get_new_general_appointments_url}?doc_id=${JSON.stringify(data)}&person_type=${my_person_type}`
      //       break;
      //     default:
      //     this.new_gen_appoint_url = `${this.get_new_general_appointments_url}?doc_id=${JSON.stringify(data)}&person_type=D`
      //     break;
      //   }
      // }
      this.new_gen_appoint_url = `${
        this.get_new_general_appointments_url
      }?doc_id=${JSON.stringify(data)}&person_type=${JSON.stringify(
        my_person_type
      )}`;

      console.log(
        "data.ts get_patients_referred line 621 JSON.stringify(data)" +
          JSON.stringify(data) +
          " AND this.new_gen_appoint_url = " +
          this.new_gen_appoint_url
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(this.new_gen_appoint_url)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_new_general_appointments_url res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_new_general_appointments_count(data, my_person_type) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.get_new_general_appointments_count_url
          }?doc_id=${JSON.stringify(data)}&person_type=${JSON.stringify(
            my_person_type
          )}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            // console.log("get_new_general_appointments_count res = " + JSON.stringify(res));
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_patients_appointments_count(data) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.get_patients_appointments_count_url
          }?patient_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            //  console.log("get_patients_appointments_count res = " + JSON.stringify(res));

            resolve(res);
          },
          (err) => {
            // console.log("get_patients_appointments_count err = " + JSON.stringify(err));
            reject(err);
          }
        );
    });
  }

  //

  get_new_personaldoctorserviceappointments(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_new_personaldoctorserviceappointments line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_new_personaldoctorserviceappointments_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_new_personaldoctorserviceappointments res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_personaldoctorconfirmedearnings(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_new_personaldoctorserviceappointments line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_personaldoctorconfirmedearnings_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_new_personaldoctorserviceappointments res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_medication(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_medication_url line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_medication_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_medication_url res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_videoconsult(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_videoconsult_url line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_videoconsult_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_videoconsult_url res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_homecare(data, person_type) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_homecare line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_homecare_url
          }?doc_id=${JSON.stringify(data)}&person_type=${person_type}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_homecare res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  //

  get_doc_pds_appointments_prescription(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_prescription line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_prescription_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_prescription res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  //

  get_doc_pds_appointments_phoneconsult(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_phoneconsult line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_phoneconsult_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_phoneconsult res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_doc_pds_appointments_videoconsult(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_videoconsult line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_videoconsult_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_videoconsult res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // get_doc_pds_appointments_homecare
  get_doc_pds_appointments_homecare(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_homecare line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_homecare_url
          }?doc_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_homecare res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_new_general_appointments_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_patients_referred line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_new_general_appointments_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_new_general_appointments_details_url res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_new_personaldoctorserviceappointments_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_new_personaldoctorserviceappointments line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_new_personaldoctorserviceappointments_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_new_personaldoctorserviceappointments res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_medication_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_medication_details_url line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_medication_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_medication_details_url res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_videoconsult_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_videoconsult_details_url line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_videoconsult_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_videoconsult_details_url res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_general_appointments_homecare_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_general_appointments_homecare line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_general_appointments_homecare_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_general_appointments_homecare_details res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  //

  get_doc_pds_appointments_prescription_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_prescription line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_prescription_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_prescription res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  //

  get_doc_pds_appointments_phoneconsult_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_phoneconsult line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_phoneconsult_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_phoneconsult res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_doc_pds_appointments_videoconsult_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_videoconsult line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_videoconsult_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_videoconsult res = " +
                JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // get_doc_pds_appointments_homecare
  get_doc_pds_appointments_homecare_details(data) {
    return new Promise((resolve, reject) => {
      console.log(
        "data.ts get_doc_pds_appointments_homecare line 621 JSON.stringify(data)" +
          JSON.stringify(data)
      );
      // return this.http.get(`${baseURL}/getusertunzas/${param.userId}`, {
      this.http
        .get(
          `${
            this.get_doc_pds_appointments_homecare_details_url
          }?record_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            console.log(
              "get_doc_pds_appointments_homecare res = " + JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_confirmed_appointments_by_patient(data) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.get_confirmed_appointments_by_patient_url
          }?patient_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            // console.log("get_doc_pds_appointments_homecare res = " + JSON.stringify(res));
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_confirmed_appointments_by_patient_count(data) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          `${
            this.get_confirmed_appointments_by_patient_count_url
          }?patient_id=${JSON.stringify(data)}`
        )
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  new_doc_appointment_accept_decline(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.new_doc_appointment_accept_decline_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  check_patient_pds_status(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.check_patient_pds_status_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  reset_password_get_phonenumber(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.reset_password_get_phonenumber_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  reset_password_get_smscode(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.reset_password_get_smscode_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  reset_password_new_password(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.reset_password_new_password_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  read_appointment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.read_appointment_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  get_appversion(data) {
    return new Promise((resolve, reject) => {
      // this.http.get(this.versionCheckUrl)
      this.http
        .get(`${this.versionCheckUrl}?platform=${JSON.stringify(data)}`)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get_appversions() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.versionsCheckUrl)
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  attend_to_pds_prescription(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.attend_to_pds_prescription_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  get_bill_details(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.bill_details_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
    //
  }

  accept_or_reject_bill(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.accept_or_reject_bill_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  make_payment(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.make_payment_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  make_payment_card(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.make_payment_card_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }

  retrieve_subscription_id(data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.retrieve_subscription_id_url, JSON.stringify(data))
        .timeout(this.timeout_value)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(console.log(JSON.stringify(err)));
          }
        );
    });
  }
}
