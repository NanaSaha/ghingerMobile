// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule, Storage } from "@ionic/storage";
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { IonicSelectableModule } from "ionic-selectable";

import { Items } from "../mocks/providers/items";
// import { Settings, User, Api } from '../providers';
import { MyApp } from "./app.component";
import { OneSignal } from "@ionic-native/onesignal";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { EmailComposer } from "@ionic-native/email-composer";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { MedAppointPage } from "../pages/med-appoint/med-appoint";
import { BookMedPage } from "../pages/book-med/book-med";
import { BookLabPage } from "../pages/book-lab/book-lab";
import { BookMediPage } from "../pages/book-medi/book-medi";
import { BookDoctorPage } from "../pages/book-doctor/book-doctor";
import { HospitalListPage } from "../pages/hospital-list/hospital-list";
import { HospitalList1Page } from "../pages/hospital-list1/hospital-list1";
import { LabHistoryPage } from "../pages/lab-history/lab-history";
import { DocHistoryPage } from "../pages/doc-history/doc-history";
import { PersonalModalPage } from "../pages/personal-modal/personal-modal";
import { PersonalWelPage } from "../pages/personal-wel/personal-wel";
import { DoctorPage } from "../pages/doctor/doctor";
import { MenuPage } from "../pages/menu/menu";
import { SearchPage } from "../pages/search/search";
import { LabSearchPage } from "../pages/lab-search/lab-search";
import { AddRegisPage } from "../pages/add-regis/add-regis";
import { DocpagePersonalPage } from "../pages/docpage-personal/docpage-personal";
import { LocationPage } from "../pages/location/location";
import { NoticePage } from "../pages/notice/notice";
import { PhoneConsultPage } from "../pages/phone-consult/phone-consult";
import { VideoConsultPage } from "../pages/video-consult/video-consult";
import { VidConsultPage } from "../pages/vid-consult/vid-consult";
import { AcceptedAppPage } from "../pages/accepted-app/accepted-app";
import { AcceptedApp2Page } from "../pages/accepted-app2/accepted-app2";
import { PhoneConsListPage } from "../pages/phone-cons-list/phone-cons-list";
import { VideoConsListPage } from "../pages/video-cons-list/video-cons-list";
import { HomeConsListPage } from "../pages/home-cons-list/home-cons-list";
import { PrescriptionConsListPage } from "../pages/prescription-cons-list/prescription-cons-list";
import { PatientNewRecordPage } from "../pages/patient-new-record/patient-new-record";
import { HomeSearchPage } from "../pages/home-search/home-search";
import { PasswordPage } from "../pages/password/password";
import { PrescriptionPage } from "../pages/prescription/prescription";
import { BookHomePage } from "../pages/book-home/book-home";
import { RecordPage } from "../pages/record/record";
import { PatientDetailsPage } from "../pages/patient-details/patient-details";
import { PersonalHomeCarePage } from "../pages/personal-home-care/personal-home-care";
import { MedicationSearchPage } from "../pages/medication-search/medication-search";
import { ReferPage } from "../pages/refer/refer";
// import { Keyboard } from '@ionic-native/keyboard';
import { AutoCompleteModule } from "ionic2-auto-complete";
import { CompleteTestService } from "../providers/complete-test-service/complete-test-service";
import { SuburbLocationService } from "../providers/complete-test-service/suburb-location-service";
import { DataProvider } from "../providers/data/data";
import { RemovehtmltagsPipe } from "../pipes/removehtmltags/removehtmltags";
import { Search2Page } from "../pages/search2/search2";
import { MedappointmentdetailsPage } from "../pages/medappointmentdetails/medappointmentdetails";
import { MedicationhistoryPage } from "../pages/medicationhistory/medicationhistory";
import { MedicationdetailsPage } from "../pages/medicationdetails/medicationdetails";
import { LabdetailsPage } from "../pages/labdetails/labdetails";
import { Labhistory1Page } from "../pages/labhistory1/labhistory1";
import { VideoconsulthistoryPage } from "../pages/videoconsulthistory/videoconsulthistory";
import { VideoconsultdetailsPage } from "../pages/videoconsultdetails/videoconsultdetails";
import { HomecarehistoryPage } from "../pages/homecarehistory/homecarehistory";
import { HomecaredetailsPage } from "../pages/homecaredetails/homecaredetails";
import { PrescriptionhistoryPage } from "../pages/prescriptionhistory/prescriptionhistory";
import { PrescriptiondetailsPage } from "../pages/prescriptiondetails/prescriptiondetails";
import { PhoneconsulthistoryPage } from "../pages/phoneconsulthistory/phoneconsulthistory";
import { PhoneconsultdetailsPage } from "../pages/phoneconsultdetails/phoneconsultdetails";
import { ProfessionalInfoPage } from "../pages/professionalinfo/professionalinfo";
import { PdspatientdetailsPage } from "../pages/pdspatientdetails/pdspatientdetails";
import { AutoCompleteService } from "ionic2-auto-complete";
import { DoctorHomePage } from "../pages/doctorhome/doctorhome";
import { doctornewappointmentTabsPage } from "../pages/doctornewappointment/doctornewappointment";
import { PersonaldoctorserviceappointmentsPage } from "../pages/personaldoctorserviceappointments/personaldoctorserviceappointments";

import { DoctorgeneralappointmentsTabsPage } from "../pages/doctor_general_appointments/doctor_general_appointments";
import { DocgeneralmedicationPage } from "../pages/docgeneralmedication/docgeneralmedication";
import { DocgeneralvidconsultPage } from "../pages/docgeneralvidconsult/docgeneralvidconsult";
import { DocgeneralhomecarePage } from "../pages/docgeneralhomecare/docgeneralhomecare";
import { DoctorpdsappointmentsTabsPage } from "../pages/doctor_pds_appointments/doctor_pds_appointments";
import { DocappointmentMenuPage } from "../pages/docappointmentmenu/docappointmentmenu";
import { DocgeneralappointmentlistsPage } from "../pages/docgeneralappointmentlists/docgeneralappointmentlists";
import { ReferpatientlistsPage } from "../pages/referpatientlists/referpatientlists";
import { DocgeneralappointmentDetailsPage } from "../pages/docgeneralappointmentdetails/docgeneralappointmentdetails";
import { PersonaldoctorserviceappointmentlistsPage } from "../pages/personaldoctorserviceappointmentlists/personaldoctorserviceappointmentlists";
import { DocgeneralmedicationlistsPage } from "../pages/docgeneralmedicationlists/docgeneralmedicationlists";
import { DocgeneralvideoconsultlistsPage } from "../pages/docgeneralvidconsultlists/docgeneralvidconsultlists";
import { DocgeneralhomecarelistsPage } from "../pages/docgeneralhomecarelists/docgeneralhomecarelists";
import { DocpdsprescriptionDetailsPage } from "../pages/docpdsprescriptiondetails/docpdsprescriptiondetails";
import { DocpdsphoneconsultlistsPage } from "../pages/docpdsphoneconsultlists/docpdsphoneconsultlists";
import { DocpdsphoneconsultDetailsPage } from "../pages/docpdsphoneconsultdetails/docpdsphoneconsultdetails";
import { DocpdsvideoconsultlistsPage } from "../pages/docpdsvideoconsultlists/docpdsvideoconsultlists";
import { DocpdsvideoconsultDetailsPage } from "../pages/docpdsvideoconsultdetails/docpdsvideoconsultdetails";
import { DocpdshomecareconsultlistsPage } from "../pages/docpdshomecareconsultlists/docpdshomecareconsultlists";
import { DocpdshomecareDetailsPage } from "../pages/docpdshomecareconsultdetails/docpdshomecareconsultdetails";
import { PersonaldoctorserviceappointmentsDeclinePage } from "../pages/personaldoctorserviceappointmentsdecline/personaldoctorserviceappointmentsdecline";
import { Badge } from "@ionic-native/badge";
import { Network } from "@ionic-native/network";
import { Placeorderforpatient } from "../pages/placeorderforpatient/placeorderforpatient";
import { UnattendedappointmentsPage } from "../pages/unattendedappointments/unattendedappointments";
//
import { Market } from "@ionic-native/market";
import { AppVersion } from "@ionic-native/app-version";
import { PatientdoctorrecordsdetailsPage } from "../pages/patientdoctorrecordsdetails/patientdoctorrecordsdetails";
import { ResetcodePage } from "../pages/resetcode/resetcode";
import { NotificationsPage } from "../pages/notifications/notifications";
import { InvoicePage } from "../pages/invoice/invoice";

import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { UnattendedappointmentdetailsPage } from "../pages/unattendedappointmentdetails/unattendedappointmentdetails";
import { Pdsprescription } from "../pages/pdsprescription/pdsprescription";
import { BackgroundMode } from "@ionic-native/background-mode";
import { BilldetailsPage } from "../pages/billdetails/billdetails";
import { PaymentoptionPage } from "../pages/paymentoption/paymentoption";
import { MomopaymentPage } from "../pages/momopayment/momopayment";
import { ConfirmmomopaymentPage } from "../pages/confirmmomopayment/confirmmomopayment";
import { LabimagesPage } from "../pages/labimages/labimages";
import { WelcomePage } from "../pages/welcome/welcome";
import { ProfilePage } from "../pages/profile/profile";
import { ProfileEditPage } from "../pages/profile-edit/profile-edit";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { FeedbackPage } from "../pages/feedback/feedback";
import { PaymentHistoryPage } from "../pages/payment-history/payment-history";

import { SubscriptionPage } from "../pages/subscription/subscription";
import { SubscriptionBookPage } from "../pages/subscription-book/subscription-book";
import { SubscriptionSummaryPage } from "../pages/subscription-summary/subscription-summary";
import { SubscriptionHistoryPage } from "../pages/subscription-history/subscription-history";
import { SubscriptionHistoryDocPage } from "../pages/subscription-history-doc/subscription-history-doc";

import { SubscriptionHistoryDetailsPage } from "../pages/subscription-history-details/subscription-history-details";
import { SubscriptionForeignPage } from "../pages/subscription-foreign/subscription-foreign";
import { SubscriptionBookForeignPage } from "../pages/subscription-book-foreign/subscription-book-foreign";

import { CovidPage } from "../pages/covid/covid";
import { BookCovidPage } from '../pages/book-covid/book-covid';


import { WriteReportPage } from "../pages/write-report/write-report";
import { ReportsPage } from "../pages/reports/reports";
import { ReferalsPage } from "../pages/referals/referals";
import { TermsPage } from "../pages/terms/terms";



import { InAppBrowser } from "@ionic-native/in-app-browser";
import { WebView } from "@ionic-native/ionic-webview/ngx";

import { Angular4PaystackModule } from 'angular4-paystack';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  // return new Settings(storage, {
  //   option1: true,
  //   option2: 'Ionitron J. Framework',
  //   option3: '3',
  //   option4: 'Hello'
  // });
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignupPage,
    LoginPage,
    MedAppointPage,
    MenuPage,
    HospitalListPage,
    HospitalList1Page,
    BookMedPage,
    SearchPage,
    LabHistoryPage,
    LabSearchPage,
    BookLabPage,
    DocHistoryPage,
    LocationPage,
    BookDoctorPage,
    PersonalModalPage,
    PersonalWelPage,
    DoctorPage,
    PhoneConsultPage,
    AcceptedAppPage,
    NoticePage,
    DocpagePersonalPage,
    AddRegisPage,
    PhoneConsListPage,
    VideoConsultPage,
    VidConsultPage,
    PersonalHomeCarePage,
    VideoConsListPage,
    HomeConsListPage,
    PasswordPage,
    HomeSearchPage,
    BookHomePage,
    PrescriptionPage,
    PatientDetailsPage,
    PatientNewRecordPage,
    AcceptedApp2Page,
    MedicationSearchPage,
    BookMediPage,
    PrescriptionConsListPage,
    RemovehtmltagsPipe,
    RecordPage,
    ReferPage,
    Search2Page,
    MedappointmentdetailsPage,
    MedicationhistoryPage,
    MedicationdetailsPage,
    LabdetailsPage,
    Labhistory1Page,
    VideoconsulthistoryPage,
    VideoconsultdetailsPage,
    HomecarehistoryPage,
    HomecaredetailsPage,
    PrescriptionhistoryPage,
    PrescriptiondetailsPage,
    PhoneconsulthistoryPage,
    PhoneconsultdetailsPage,
    ProfessionalInfoPage,
    PdspatientdetailsPage,
    DoctorHomePage,
    doctornewappointmentTabsPage,
    PersonaldoctorserviceappointmentsPage,
    DoctorgeneralappointmentsTabsPage,
    DocgeneralmedicationPage,
    DocgeneralvidconsultPage,
    DocgeneralhomecarePage,
    DoctorpdsappointmentsTabsPage,
    DocappointmentMenuPage,
    DocgeneralappointmentlistsPage,
    DocgeneralappointmentDetailsPage,
    ReferpatientlistsPage,
    PersonaldoctorserviceappointmentlistsPage,
    DocgeneralmedicationPage,
    DocgeneralmedicationlistsPage,
    DocgeneralvideoconsultlistsPage,
    DocgeneralhomecarelistsPage,
    DocpdsprescriptionDetailsPage,
    DocpdsphoneconsultlistsPage,
    DocpdsphoneconsultDetailsPage,
    DocpdsvideoconsultlistsPage,
    DocpdsvideoconsultDetailsPage,
    DocpdshomecareconsultlistsPage,
    DocpdshomecareDetailsPage,
    PersonaldoctorserviceappointmentsDeclinePage,
    Placeorderforpatient,
    UnattendedappointmentsPage,
    PatientdoctorrecordsdetailsPage,
    ResetcodePage,
    ChangepasswordPage,
    UnattendedappointmentdetailsPage,
    Pdsprescription,
    BilldetailsPage,
    PaymentoptionPage,
    MomopaymentPage,
    ConfirmmomopaymentPage,
    LabimagesPage,
    WelcomePage,
    NotificationsPage,
    ProfilePage,
    ProfileEditPage,
    InvoicePage,
    FeedbackPage,
    PaymentHistoryPage,
    SubscriptionPage,
    SubscriptionBookPage,
    SubscriptionSummaryPage,
    SubscriptionHistoryPage,
    SubscriptionHistoryDetailsPage,
    SubscriptionHistoryDocPage,
    WriteReportPage,
    ReportsPage,
    ReferalsPage,
    TermsPage,
    SubscriptionForeignPage,
    SubscriptionBookForeignPage,
    BookCovidPage,
    CovidPage
  ],
  imports: [
    BrowserModule,
    IonicSelectableModule,
    // HttpClientModule,
    HttpModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp, {
      autocomplete: false, //'off',
      scrollAssist: false,
      autoFocusAssist: false,
    }),
    IonicStorageModule.forRoot(),
     Angular4PaystackModule,

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [HttpClient]
    //   }
    // }),
    // IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignupPage,
    LoginPage,
    MedAppointPage,
    MenuPage,
    HospitalListPage,
    HospitalList1Page,
    BookMedPage,
    SearchPage,
    LabHistoryPage,
    LabSearchPage,
    BookLabPage,
    DocHistoryPage,
    LocationPage,
    BookDoctorPage,
    PersonalModalPage,
    PersonalWelPage,
    DoctorPage,
    PhoneConsultPage,
    AcceptedAppPage,
    NoticePage,
    DocpagePersonalPage,
    AddRegisPage,
    PhoneConsListPage,
    VideoConsultPage,
    PersonalHomeCarePage,
    VideoConsListPage,
    HomeConsListPage,
    PasswordPage,
    VidConsultPage,
    HomeSearchPage,
    BookHomePage,
    PrescriptionPage,
    PatientDetailsPage,
    PatientNewRecordPage,
    AcceptedApp2Page,
    MedicationSearchPage,
    BookMediPage,
    PrescriptionConsListPage,
    RecordPage,
    ReferPage,
    Search2Page,
    MedappointmentdetailsPage,
    MedicationhistoryPage,
    MedicationdetailsPage,
    LabdetailsPage,
    Labhistory1Page,
    VideoconsulthistoryPage,
    VideoconsultdetailsPage,
    HomecarehistoryPage,
    HomecaredetailsPage,
    PrescriptionhistoryPage,
    PrescriptiondetailsPage,
    PhoneconsulthistoryPage,
    PhoneconsultdetailsPage,
    ProfessionalInfoPage,
    PdspatientdetailsPage,
    DoctorHomePage,
    doctornewappointmentTabsPage,
    PersonaldoctorserviceappointmentsPage,
    DoctorgeneralappointmentsTabsPage,
    DocgeneralmedicationPage,
    DocgeneralvidconsultPage,
    DocgeneralhomecarePage,
    DoctorpdsappointmentsTabsPage,
    DocappointmentMenuPage,
    DocgeneralappointmentlistsPage,
    DocgeneralappointmentDetailsPage,
    ReferpatientlistsPage,
    PersonaldoctorserviceappointmentlistsPage,
    DocgeneralmedicationPage,
    DocgeneralmedicationlistsPage,
    DocgeneralvideoconsultlistsPage,
    // DocgeneralhomecarelistsPage
    DocgeneralhomecarelistsPage,
    DocpdsprescriptionDetailsPage,
    DocpdsphoneconsultlistsPage,
    DocpdsphoneconsultDetailsPage,
    DocpdsvideoconsultlistsPage,
    DocpdsvideoconsultDetailsPage,
    DocpdshomecareconsultlistsPage,
    DocpdshomecareDetailsPage,
    PersonaldoctorserviceappointmentsDeclinePage,
    Placeorderforpatient,
    UnattendedappointmentsPage,
    PatientdoctorrecordsdetailsPage,
    ResetcodePage,
    ChangepasswordPage,
    UnattendedappointmentdetailsPage,
    Pdsprescription,
    BilldetailsPage,
    PaymentoptionPage,
    MomopaymentPage,
    ConfirmmomopaymentPage,
    LabimagesPage,
    WelcomePage,
    NotificationsPage,
    ProfilePage,
    ProfileEditPage,
    InvoicePage,
    FeedbackPage,
    PaymentHistoryPage,
    SubscriptionPage,
    SubscriptionBookPage,
    SubscriptionSummaryPage,
    SubscriptionHistoryPage,
    SubscriptionHistoryDetailsPage,
    SubscriptionHistoryDocPage,
    WriteReportPage,
    ReportsPage,
    ReferalsPage,
    TermsPage,
    SubscriptionForeignPage,
    SubscriptionBookForeignPage,
    BookCovidPage,
    CovidPage
  ],
  providers: [
    // Api,
    Items,
    // User,
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FileOpener,
    Transfer,
    FilePath,
    FileTransfer,
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CompleteTestService,
    SuburbLocationService,
    DataProvider,
    Badge,
    Network,
    AppVersion,
    EmailComposer,
    Market,
    AndroidPermissions,
    BackgroundMode,
    ScreenOrientation,
    InAppBrowser,
    OneSignal,
    WebView,

    // { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // // Keep this to enable Ionic's runtime error handling during development
    // { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
})
export class AppModule {}
