import React from 'react'
import { AppProvider, useAppStore } from './store/appStore'
import { HomePage } from './pages/HomePage'
import { DiscoverPage } from './pages/DiscoverPage'
import { ConsultRecordsPage } from './pages/ConsultRecordsPage'
import { MinePage } from './pages/MinePage'
import {
  FindDoctorPage,
  DoctorStudioPage,
  DoctorBioPage,
  SpecialtyListPage,
  SpecialtyDetailPage,
} from './pages/DoctorPages'
import {
  VideoDetailPage,
  LivePreviewPage,
  LiveRoomPage,
  LiveReplayPage,
  ArticleDetailPage,
  ArticleCommentsPage,
} from './pages/DiscoverDetailPages'
import {
  SearchPage,
  LoginPage,
  RegHospitalsPage,
  RegDeptsPage,
  RegSlotsPage,
  RegConfirmPage,
  InquiryImageFormPage,
  InquiryAvFormPage,
  PatientSelectPage,
  PatientEditPage,
  ChatFreePage,
  ChatImagePage,
  ChatAvPage,
  CallRoomPage,
  ConsultSummaryPage,
  ConsultReviewPage,
} from './pages/ConsultAndRegPages'
import {
  OrdersPage,
  OrderDetailPage,
  PaymentPage,
  PaymentResultPage,
  OrderRefundPage,
  RefundDetailPage,
  PrescriptionPage,
  DrugCheckoutPage,
  AddressListPage,
  AddressEditPage,
  LogisticsPage,
  MallPage,
  MallDetailPage,
  CartPage,
  InvoiceSelectPage,
  InvoiceSubmitPage,
  MyInvoicesPage,
  InvoiceDetailPage,
  MessagesPage,
  MyDoctorsPage,
  MyFavoritesPage,
  MyFamilyPage,
  MedicalRecordsPage,
  MedicalRecordAddPage,
  MyCommentsPage,
  MyReviewsPage,
  ReportsPage,
  ReportDetailPage,
  ReportSheetPage,
  NucleicAcidPage,
  NucleicQueryPage,
  NucleicHospitalsPage,
  MedHelperPage,
  MedDetailPage,
  MedAddPage,
  MedRemindPage,
  SettingsPage,
  AccountSettingsPage,
  AccountSecurityPage,
  EditNicknamePage,
  RealnameAuthPage,
  ChangePasswordPage,
  DeleteAccountPage,
  AgreementPage,
  AboutPage,
  HelpFeedbackPage,
  AiTonguePage,
  FrameViewerPage,
} from './pages/OrderAndToolPages'

function AppRouter() {
  const { activeTab, currentRoute, toast } = useAppStore()

  const renderPage = () => {
    switch (currentRoute.page) {
      case 'root':
        if (activeTab === 'home') return <HomePage />
        if (activeTab === 'discover') return <DiscoverPage />
        if (activeTab === 'consult') return <ConsultRecordsPage />
        if (activeTab === 'mine') return <MinePage />
        return <DiscoverPage />
      case 'search':
        return <SearchPage />
      case 'find-doctor':
        return <FindDoctorPage />
      case 'doctor-studio':
        return <DoctorStudioPage />
      case 'doctor-bio':
        return <DoctorBioPage />
      case 'specialty-list':
        return <SpecialtyListPage />
      case 'specialty-detail':
        return <SpecialtyDetailPage />
      case 'login':
        return <LoginPage />
      case 'reg-hospitals':
        return <RegHospitalsPage />
      case 'reg-depts':
        return <RegDeptsPage />
      case 'reg-slots':
        return <RegSlotsPage />
      case 'reg-confirm':
        return <RegConfirmPage />
      case 'inquiry-image-form':
        return <InquiryImageFormPage />
      case 'inquiry-av-form':
        return <InquiryAvFormPage />
      case 'patient-select':
        return <PatientSelectPage />
      case 'patient-edit':
        return <PatientEditPage />
      case 'chat-free':
        return <ChatFreePage />
      case 'chat-image':
        return <ChatImagePage />
      case 'chat-av':
        return <ChatAvPage />
      case 'call-room':
        return <CallRoomPage />
      case 'consult-summary':
        return <ConsultSummaryPage />
      case 'consult-review':
        return <ConsultReviewPage />
      case 'video-detail':
        return <VideoDetailPage />
      case 'live-preview':
        return <LivePreviewPage />
      case 'live-room':
        return <LiveRoomPage />
      case 'live-replay':
        return <LiveReplayPage />
      case 'article-detail':
        return <ArticleDetailPage />
      case 'article-comments':
        return <ArticleCommentsPage />
      case 'orders':
        return <OrdersPage />
      case 'order-detail':
        return <OrderDetailPage />
      case 'payment':
        return <PaymentPage />
      case 'payment-result':
        return <PaymentResultPage />
      case 'order-refund':
        return <OrderRefundPage />
      case 'refund-detail':
        return <RefundDetailPage />
      case 'prescription':
        return <PrescriptionPage />
      case 'drug-checkout':
        return <DrugCheckoutPage />
      case 'address-list':
        return <AddressListPage />
      case 'address-edit':
        return <AddressEditPage />
      case 'logistics':
        return <LogisticsPage />
      case 'mall':
        return <MallPage />
      case 'mall-detail':
        return <MallDetailPage />
      case 'cart':
        return <CartPage />
      case 'invoice-select':
        return <InvoiceSelectPage />
      case 'invoice-submit':
        return <InvoiceSubmitPage />
      case 'my-invoices':
        return <MyInvoicesPage />
      case 'invoice-detail':
        return <InvoiceDetailPage />
      case 'messages':
        return <MessagesPage />
      case 'my-doctors':
        return <MyDoctorsPage />
      case 'my-favorites':
        return <MyFavoritesPage />
      case 'my-family':
        return <MyFamilyPage />
      case 'medical-records':
        return <MedicalRecordsPage />
      case 'medical-record-add':
        return <MedicalRecordAddPage />
      case 'my-comments':
        return <MyCommentsPage />
      case 'my-reviews':
        return <MyReviewsPage />
      case 'reports':
        return <ReportsPage />
      case 'report-detail':
        return <ReportDetailPage />
      case 'report-sheet':
        return <ReportSheetPage />
      case 'nucleic-acid':
        return <NucleicAcidPage />
      case 'nucleic-query':
        return <NucleicQueryPage />
      case 'nucleic-hospitals':
        return <NucleicHospitalsPage />
      case 'med-helper':
        return <MedHelperPage />
      case 'med-detail':
        return <MedDetailPage />
      case 'med-add':
        return <MedAddPage />
      case 'med-remind':
        return <MedRemindPage />
      case 'settings':
        return <SettingsPage />
      case 'account-settings':
        return <AccountSettingsPage />
      case 'account-security':
        return <AccountSecurityPage />
      case 'edit-nickname':
        return <EditNicknamePage />
      case 'realname-auth':
        return <RealnameAuthPage />
      case 'change-password':
        return <ChangePasswordPage />
      case 'delete-account':
        return <DeleteAccountPage />
      case 'agreement':
        return <AgreementPage />
      case 'about':
        return <AboutPage />
      case 'help-feedback':
        return <HelpFeedbackPage />
      case 'ai-tongue':
        return <AiTonguePage />
      case 'frame-viewer':
        return <FrameViewerPage />
      default:
        return <DiscoverPage />
    }
  }

  return (
    <div className="viewport-shell">
      {renderPage()}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 84,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(17, 24, 39, 0.88)',
            color: '#ffffff',
            fontSize: 13,
            lineHeight: '18px',
            padding: '8px 16px',
            borderRadius: 18,
            zIndex: 9999,
            maxWidth: 320,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}
