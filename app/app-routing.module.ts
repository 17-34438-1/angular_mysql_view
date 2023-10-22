import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LaborCategoryAddComponent } from './labor-category-add/labor-category-add.component';
import { LaborCategoryEditComponent } from './labor-category-edit/labor-category-edit.component';
import { LaborCategoryListComponent } from './labor-category-list/labor-category-list.component';
import { LoginComponent } from './login/login.component';
import { ContainerEventHistoryComponent } from './container-event-history/container-event-history.component';
import { EquipmentHandlingLoginLogoutComponent } from './equipment-handling-login-logout/equipment-handling-login-logout.component';
import { EquipmentHandlingPerformanceHistoryComponent } from './equipment-handling-performance-history/equipment-handling-performance-history.component';
import { OperatorQgcHandlingPerformanceComponent } from './operator-qgc-handling-performance/operator-qgc-handling-performance.component';
import { OperatorQgcHandlingPerformanceReportComponent } from './operator-qgc-handling-performance-report/operator-qgc-handling-performance-report.component';
import { WorkLocationAddComponent } from './work-location-add/work-location-add.component';
import { DgContainersDischargeSummaryListFormComponent } from './dg-containers-discharge-summary-list-form/dg-containers-discharge-summary-list-form.component';
import { DgContDischargeSummaryListComponent } from './dg-cont-discharge-summary-list/dg-cont-discharge-summary-list/dg-cont-discharge-summary-list.component';
import { WorkLocationListComponent } from './work-location-list/work-location-list.component';
import { WorkLocationEditComponent } from './work-location-edit/work-location-edit.component';
import { WorkCategoryListComponent } from './work-category-list/work-category-list.component';
import { WorkCategoryAddComponent } from './work-category-add/work-category-add.component';
import { WorkCategoryEditComponent } from './work-category-edit/work-category-edit.component';

import { EquipmentHandlingPeroformaceRtgComponent } from './equipment-handling-peroformace-rtg/equipment-handling-peroformace-rtg.component';
import { EquipmentHandlingPerformanceReportRtgComponent } from './equipment-handling-performance-report-rtg/equipment-handling-performance-report-rtg.component';
import { OperatorRtgHandlingPerformanceComponent } from './operator-rtg-handling-performance/operator-rtg-handling-performance.component';
import { OperatorRtgHandlingPerformanceReportComponent } from './operator-rtg-handling-performance-report/operator-rtg-handling-performance-report.component';
import { OperatorScHandlingPerformaceComponent } from './operator-sc-handling-performace/operator-sc-handling-performace.component';
import { OperatorScHandlingPerformanceReportComponent } from './operator-sc-handling-performance-report/operator-sc-handling-performance-report.component';
import { OffDockDestinationWiseContainerComponent } from './off-dock-destination-wise-container/off-dock-destination-wise-container.component';
import { OffDockDestinationWiseContainerListComponent } from './off-dock-destination-wise-container-list/off-dock-destination-wise-container-list.component';
import { DesignationCategoryListComponent } from './designation-category-list/designation-category-list.component';
import { DesignationCategoryAddComponent } from './designation-category-add/designation-category-add.component';
import { DesignationCategoryEditComponent } from './designation-category-edit/designation-category-edit.component';
import { GangListComponent } from './gang-list/gang-list.component';
import { GangAddComponent } from './gang-add/gang-add.component';
import { GangEditComponent } from './gang-edit/gang-edit.component';
import { LaborListComponent } from './labor-list/labor-list.component';
import { PodListComponent } from './pod-list/pod-list.component';
import { LaborInfoComponent } from './labor-info/labor-info.component';
import { IsoCodeComponent } from './iso-code/iso-code.component';
import { LaborAddComponent } from './labor-add/labor-add.component';
import { LaborEditComponent } from './labor-edit/labor-edit.component';
import { ImportContainerDischargeAndBalanceFormComponent } from './import-container-discharge-and-balance-form/import-container-discharge-and-balance-form.component';
import { ImportContainerDischargeAndBalanceReportComponent } from './import-container-discharge-and-balance-report/import-container-discharge-and-balance-report.component';
import { LaborAssignListComponent } from './labor-assign-list/labor-assign-list.component';
import { LaborAssignComponent } from './labor-assign/labor-assign.component';
import { OffDockBlockedContainerListComponent } from './off-dock-blocked-container-list/off-dock-blocked-container-list.component';
import { RemovalListOfOverFlowYardComponent } from './removal-list-of-over-flow-yard/removal-list-of-over-flow-yard/removal-list-of-over-flow-yard.component';
import { RemovalListOfOverFlowYardReportComponent } from './removal-list-of-over-flow-yard-report/removal-list-of-over-flow-yard-report/removal-list-of-over-flow-yard-report.component';
import { ExportCopinoFormComponent } from './export-copino-form/export-copino-form.component';
import { ExportCopinoReportComponent } from './export-copino-report/export-copino-report.component';
import { ExportContainerBlockReportFormComponent } from './export-container-block-report-form/export-container-block-report-form.component';
import { ExportContainerBlockReportListComponent } from './export-container-block-report-list/export-container-block-report-list.component';
import { DgContainersDischargeListByRotationFormComponent } from './dg-containers-discharge-list-by-rotation-form/dg-containers-discharge-list-by-rotation-form.component';
import { DgContainersDischargeListByRotationComponent } from './dg-containers-discharge-list-by-rotation/dg-containers-discharge-list-by-rotation.component';
import { AssignedGangListComponent } from './assigned-gang-list/assigned-gang-list.component';
import { AssignGangComponent } from './assign-gang/assign-gang.component';
import { AssignedGangEditComponent } from './assigned-gang-edit/assigned-gang-edit.component';

import { FeederDischargeSummaryListComponent } from './feeder-discharge-summary-list/feeder-discharge-summary-list.component';
import { FeederDischargeSummaryListReportComponent } from './feeder-discharge-summary-list-report/feeder-discharge-summary-list-report.component';
import { ExportDestinationWiseMloLoadedContainerListComponent } from './export-destination-wise-mlo-loaded-container-list/export-destination-wise-mlo-loaded-container-list.component';
import { ExportDestinationWiseMloLoadedContainerFormComponent } from './export-destination-wise-mlo-loaded-container-form/export-destination-wise-mlo-loaded-container-form.component';
import { ExportLoadedContainerListLoadAndEmptyFormComponent } from './export-loaded-container-list-load-and-empty-form/export-loaded-container-list-load-and-empty-form.component';
import { ExportLoadedContainerListLoadAndEmptyListComponent } from './export-loaded-container-list-load-and-empty-list/export-loaded-container-list-load-and-empty-list.component';
import { ExportRotationWiseExportContainerFormComponent } from './export-rotation-wise-export-container-form/export-rotation-wise-export-container-form.component';
import { ExportRotationWiseExportContainerListComponent } from './export-rotation-wise-export-container-list/export-rotation-wise-export-container-list.component';
import { ExportMloWiseExportSummaryFormComponent } from './export-mlo-wise-export-summary-form/export-mlo-wise-export-summary-form.component';
import { ExportMloWiseExportSummaryListComponent } from './export-mlo-wise-export-summary-list/export-mlo-wise-export-summary-list.component';
import { ExportMloWiseExcelUploadedReportFormComponent } from './export-mlo-wise-excel-uploaded-report-form/export-mlo-wise-excel-uploaded-report-form.component';
import { ExportMloWiseExcelUploadedReportListComponent } from './export-mlo-wise-excel-uploaded-report-list/export-mlo-wise-excel-uploaded-report-list.component';
import { ImportContainerDischargeExcelDetailLast24HourComponent } from './import-container-discharge-excel-detail-last24-hour/import-container-discharge-excel-detail-last24-hour.component';
import { ImportContainerDischargeExcelDetailLast24HourReportDetailComponent } from './import-container-discharge-excel-detail-last24-hour-report-detail/import-container-discharge-excel-detail-last24-hour-report-detail.component';
import { ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent } from './import-container-discharge-excel-detail-last24-hour-report-summary/import-container-discharge-excel-detail-last24-hour-report-summary.component';
import { MloWiseImportLoadedContainerSummaryComponent } from './mlo-wise-import-loaded-container-summary/mlo-wise-import-loaded-container-summary.component';
import { MloWiseImportLoadedContainerSummaryReportComponent } from './mlo-wise-import-loaded-container-summary-report/mlo-wise-import-loaded-container-summary-report.component';
import { ExportExcelUploadSampleWithLoadedContainerFormComponent } from './export-excel-upload-sample-with-loaded-container-form/export-excel-upload-sample-with-loaded-container-form.component';
import { ExportExcelUploadSampleWithLoadedContainerListComponent } from './export-excel-upload-sample-with-loaded-container-list/export-excel-upload-sample-with-loaded-container-list.component';
import { ExportDateAndRotationWisePreAdvisedContainerFormComponent } from './export-date-and-rotation-wise-pre-advised-container-form/export-date-and-rotation-wise-pre-advised-container-form.component';
import { ExportDateAndRotationWisePreAdvisedContainerListComponent } from './export-date-and-rotation-wise-pre-advised-container-list/export-date-and-rotation-wise-pre-advised-container-list.component';
import { ExportCommentsByShippingSectionOnExportVesselFormComponent } from './export-comments-by-shipping-section-on-export-vessel-form/export-comments-by-shipping-section-on-export-vessel-form.component';
import { ExportCommentsByShippingSectionOnExportVesselListComponent } from './export-comments-by-shipping-section-on-export-vessel-list/export-comments-by-shipping-section-on-export-vessel-list.component';
import { ExportRotationWiseContainerInformationFormComponent } from './export-rotation-wise-container-information-form/export-rotation-wise-container-information-form.component';
import { ExportRotationWiseContainerInformationListComponent } from './export-rotation-wise-container-information-list/export-rotation-wise-container-information-list.component';
import { ExportVesselListWithStatusFormComponent } from './export-vessel-list-with-status-form/export-vessel-list-with-status-form.component';
import { ExportVesselListWithStatusDetailListComponent } from './export-vessel-list-with-status-detail-list/export-vessel-list-with-status-detail-list.component';
import { ExportVesselListWithStatusSummaryListComponent } from './export-vessel-list-with-status-summary-list/export-vessel-list-with-status-summary-list.component';
import { ExportContainerToBeLoadedFormComponent } from './export-container-to-be-loaded-form/export-container-to-be-loaded-form.component';
import { ExportContainerToBeLoadedListComponent } from './export-container-to-be-loaded-list/export-container-to-be-loaded-list.component';
import { ExportLoadedContainerFormComponent } from './export-loaded-container-form/export-loaded-container-form.component';
import { ExportLoadedContainerListComponent } from './export-loaded-container-list/export-loaded-container-list.component';

import { RemovalListOfOverFlowYardLclComponent } from './removal-list-of-over-flow-yard-lcl/removal-list-of-over-flow-yard-lcl.component';
import { RemovalListOfOverFlowYardLclReportComponent } from './removal-list-of-over-flow-yard-lcl-report/removal-list-of-over-flow-yard-lcl-report.component';

import { MloDischargeSummaryListComponent } from './mlo-discharge-summary-list/mlo-discharge-summary-list.component';
import { MloDischargeSummaryListReportComponent } from './mlo-discharge-summary-list-report/mlo-discharge-summary-list-report.component';

import { ContainerDischargeListAppComponent } from './container-discharge-list-app/container-discharge-list-app.component';
import { ContainerDischargeListAppReportComponent } from './container-discharge-list-app-report/container-discharge-list-app-report.component';

import { ImportContainerDischargeSummaryLast24HourComponent } from './import-container-discharge-summary-last24-hour/import-container-discharge-summary-last24-hour.component';
import { ImportContainerDischargeSummaryLast24HourReportComponent } from './import-container-discharge-summary-last24-hour-report/import-container-discharge-summary-last24-hour-report.component';
import { ExportContainerLoadingExcelReportFormComponent } from './export-container-loading-excel-report-form/export-container-loading-excel-report-form.component';
import { ExportContainerLoadingExcelReportListComponent } from './export-container-loading-excel-report-list/export-container-loading-excel-report-list.component';






import { ExportMloWisePreAdvisedLoadedContainerListFormComponent } from './export-mlo-wise-pre-advised-loaded-container-list-form/export-mlo-wise-pre-advised-loaded-container-list-form.component';
import { ExportMloWisePreAdvisedLoadedContainerListComponent } from './export-mlo-wise-pre-advised-loaded-container-list/export-mlo-wise-pre-advised-loaded-container-list.component';
import { ExportMloWisePreAdviceViewListComponent } from './export-mlo-wise-pre-advice-view-list/export-mlo-wise-pre-advice-view-list.component';
import { ExportMloWiseSummaryListComponent } from './export-mlo-wise-summary-list/export-mlo-wise-summary-list.component';

import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';

import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

import { ModuleListComponent } from './module-list/module-list.component';

//All Assignment
import { AllAssignmentDeliveryAndEmptyDetailParentComponent } from './all-assignment-delivery-and-empty-detail-parent/all-assignment-delivery-and-empty-detail-parent.component';

import { AssignmentAndDeliveryEmptyDetailReportComponent } from './assignment-and-delivery-empty-detail-report/assignment-and-delivery-empty-detail-report.component';
import { YardWiseAssignmentAndDeliveryEmptyDetailReportComponent } from './yard-wise-assignment-and-delivery-empty-detail-report/yard-wise-assignment-and-delivery-empty-detail-report.component';
import { ContainerSearchReportComponent } from './container-search-report/container-search-report.component';
import { AssignmentAndDeliveryEmptySummaryReportComponent } from './assignment-and-delivery-empty-summary-report/assignment-and-delivery-empty-summary-report.component';
import { ListOfNotStrippedAssignmentDeliveryContainersReportComponent } from './list-of-not-stripped-assignment-delivery-containers-report/list-of-not-stripped-assignment-delivery-containers-report.component';
import { AppraiseReSlotLocationReportComponent } from './appraise-re-slot-location-report/appraise-re-slot-location-report.component';
import { HeadDeliveryRegisterReportComponent } from './head-delivery-register-report/head-delivery-register-report.component';
import { HeadDeliveryRegisterGcbComponent } from './head-delivery-register-gcb/head-delivery-register-gcb.component';
import { MisAssignmentReportComponent } from './mis-assignment-report/mis-assignment-report.component';
import { MisAssignmentGcbReportComponent } from './mis-assignment-gcb-report/mis-assignment-gcb-report.component';

//Import Cotainer Bay View
import { ImportContainerBayViewComponent } from './import-container-bay-view/import-container-bay-view.component';
import { ImportContainerBayViewReportComponent } from './import-container-bay-view-report/import-container-bay-view-report.component';

import { ExportMloWiseLoadedContainerFormComponent } from './export-mlo-wise-loaded-container-form/export-mlo-wise-loaded-container-form.component';
import { ExportMloWiseLoadedContainerListComponent } from './export-mlo-wise-loaded-container-list/export-mlo-wise-loaded-container-list.component';
import { ExportEquipmentHandlingPerformanceRtgFormComponent } from './export-equipment-handling-performance-rtg-form/export-equipment-handling-performance-rtg-form.component';
import { ExportEquipmentHandlingPerformanceRtgListComponent } from './export-equipment-handling-performance-rtg-list/export-equipment-handling-performance-rtg-list.component';
import { HandlingReportFormComponent } from './handling-report-form/handling-report-form.component';
import { HandlingReportListComponent } from './handling-report-list/handling-report-list.component';

//Export Container Bay View
import { ExportContainerBayViewComponent } from './export-container-bay-view/export-container-bay-view.component';
import { ExportContainerBayViewReportComponent } from './export-container-bay-view-report/export-container-bay-view-report.component';

//Export Blank Bay View
import { ExportBlankBayViewComponent } from './export-blank-bay-view/export-blank-bay-view.component';
import { ExportBlankBayViewReportComponent } from './export-blank-bay-view-report/export-blank-bay-view-report.component';

import { DgContainerDeliveryReportFormComponent } from './dg-container-delivery-report-form/dg-container-delivery-report-form.component';
import { DgContainerDeliveryReportListComponent } from './dg-container-delivery-report-list/dg-container-delivery-report-list.component';
import { DgManifestFormComponent } from './dg-manifest-form/dg-manifest-form.component';
import { DgManifestListComponent } from './dg-manifest-list/dg-manifest-list.component';
import { DgContainerByRotationFormComponent } from './dg-container-by-rotation-form/dg-container-by-rotation-form.component';
import { DgContainerByRotationListComponent } from './dg-container-by-rotation-list/dg-container-by-rotation-list.component';
import { ModuleAddComponent } from './module-add/module-add.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';
import { UrlListComponent } from './url-list/url-list.component';
import { UrlAddComponent } from './url-add/url-add.component';
import { UrlEditComponent } from './url-edit/url-edit.component';
import { LclAssignmentReportComponent } from './lcl-assignment-report/lcl-assignment-report.component';
import { ExportContainerNotFoundReportFormComponent } from './export-container-not-found-report-form/export-container-not-found-report-form.component';
import { ExportContainerNotFoundReportListComponent } from './export-container-not-found-report-list/export-container-not-found-report-list.component';

import { UploadExportContainerExcelFileComponent } from './upload-export-container-excel-file/upload-export-container-excel-file.component';
import { UploadExcelForPangaonComponent } from './upload-excel-for-pangaon/upload-excel-for-pangaon.component';
import { ContainerLocationFormComponent } from './container-location-form/container-location-form.component';
import { ContainerLocationDetailsComponent } from './container-location-details/container-location-details.component';


import { ShahinSpecialReportEquipmentHandlingPerformanceHistoryFormComponent } from './shahin-special-report-equipment-handling-performance-history-form/shahin-special-report-equipment-handling-performance-history-form.component';
import { ShahinSpecialReportEquipmentHandlingPerformanceHistoryListComponent } from './shahin-special-report-equipment-handling-performance-history-list/shahin-special-report-equipment-handling-performance-history-list.component';
import { PrivilegeAddComponent } from './privilege-add/privilege-add.component';
import { LclContainerLocationFormComponent } from './lcl-container-location-form/lcl-container-location-form.component';
import { ShahinSpecialReportLoadedContainerListComponent } from './shahin-special-report-loaded-container-list/shahin-special-report-loaded-container-list.component';
import { ShahinSpecialReportLoadedContainerListFormComponent } from './shahin-special-report-loaded-container-list-form/shahin-special-report-loaded-container-list-form.component';

//Equipment HandlingPerformace Rtg Time Wise (Shahin Special Report)

import { EquipmentHandlingPerformaceRtgTimeWiseComponent } from './equipment-handling-performace-rtg-time-wise/equipment-handling-performace-rtg-time-wise.component';
import { EquipmentHandlingPerformaceRtgTimeWiseReportComponent } from './equipment-handling-performace-rtg-time-wise-report/equipment-handling-performace-rtg-time-wise-report.component';

//Contver Pangaon Container
import { ConvertPangaonContainerComponent } from './convert-pangaon-container/convert-pangaon-container.component';

// Update Vessel For Export Containers
import { UpdateVesselForExportContainersComponent } from './update-vessel-for-export-containers/update-vessel-for-export-containers.component';
import { ShahinSpecialReportLocationCertifyComponent } from './shahin-special-report-location-certify/shahin-special-report-location-certify.component';
// Change Password
import { VerifyCellNumberComponent } from './verify-cell-number/verify-cell-number.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

// Two Step Verification
import { VerifyCellNumberForTwoStepVerificationComponent } from './verify-cell-number-for-two-step-verification/verify-cell-number-for-two-step-verification.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

//IGM Cotainer List Shahin Report
import { IgmContainerListComponent } from './igm-container-list/igm-container-list.component';



import { ShahinMloWiseFinalLoadingExportReportFormComponent } from './shahin-mlo-wise-final-loading-export-report-form/shahin-mlo-wise-final-loading-export-report-form.component';
import { ShahinMloWiseFinalLoadingExportReportListComponent } from './shahin-mlo-wise-final-loading-export-report-list/shahin-mlo-wise-final-loading-export-report-list.component';
import { ShahinMloWiseFinalLoadingDetailsExportReportListComponent } from './shahin-mlo-wise-final-loading-details-export-report-list/shahin-mlo-wise-final-loading-details-export-report-list.component';


import { TodaysEdiDeclarationComponent } from './todays-edi-declaration/todays-edi-declaration.component';
import { TodaysEdiDeclarationListComponent } from './todays-edi-declaration-list/todays-edi-declaration-list.component';





//View Igm gerneral
import { ViewIgmGeneralComponent } from './view-igm-general/view-igm-general.component';
import { EdiUploadComponent } from './edi-upload/edi-upload.component';
import { ConvertIgmComponent } from './convert-igm/convert-igm.component';
import { BerthOperatorReportFormComponent } from './berth-operator-report-form/berth-operator-report-form.component';
import { BerthOperatorReportViewComponent } from './berth-operator-report-view/berth-operator-report-view.component';
import { FeederDischargeSummaryComponent } from './feeder-discharge-summary/feeder-discharge-summary.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},

  { path: 'labor/category/list', component: LaborCategoryListComponent},
  { path: 'labor/category/add', component: LaborCategoryAddComponent},
  { path: 'labor/category/edit/:id', component: LaborCategoryEditComponent},

  { path:'importReports/containerEventHistory',component:ContainerEventHistoryComponent},
  { path:'importReports/equipmentLoginLogout',component:EquipmentHandlingLoginLogoutComponent},
  { path:'importReports/equipmentLoginLogoutHistory', component:EquipmentHandlingPerformanceHistoryComponent},
  { path:'importReports/operatorQgcHandlingPerformance',component:OperatorQgcHandlingPerformanceComponent},
  { path:'importReports/operatorQgcHandlingPerformanceReport',component:OperatorQgcHandlingPerformanceReportComponent},

  { path: 'work/location/add', component:WorkLocationAddComponent},
  { path: 'work/location/list', component:WorkLocationListComponent},
  { path: 'work/location/edit/:id', component: WorkLocationEditComponent },

  { path: 'work/category/add', component:WorkCategoryAddComponent},
  { path: 'work/category/list', component: WorkCategoryListComponent},
  { path: 'work/category/edit/:id', component: WorkCategoryEditComponent},

  { path: 'designation/category/list', component:DesignationCategoryListComponent},
  { path: 'designation/category/add', component:DesignationCategoryAddComponent},
  { path: 'designation/category/edit/:id', component:DesignationCategoryEditComponent},

  {path:'IgmOperation/updateManifest',component:ConvertIgmComponent},




  {path:'DgReport/dg-container-report-form',component:DgContainerByRotationFormComponent},
  {path:'DgReport/dg-container-report-list',component:DgContainerByRotationListComponent},



  { path: 'ImportReport/berthOperatorReportForm', component: BerthOperatorReportFormComponent },
  { path: 'ImportReport/berthOperatorReportView', component: BerthOperatorReportViewComponent },



  {path:'exportReports/export-mlo-wise-loaded-container/form',component:ExportMloWiseLoadedContainerFormComponent},
  {path:'exportReports/export-mlo-wise-loaded-container/list',component:ExportMloWiseLoadedContainerListComponent},





{path:'exportReports/export-equipment-handling-performance-rtg/form',component:ExportEquipmentHandlingPerformanceRtgFormComponent},
{path:'exportReports/export-equipment-handling-performance-rtg/list',component:ExportEquipmentHandlingPerformanceRtgListComponent},



{path:'handlingReport/handling-report-form',component:HandlingReportFormComponent},

{path:'handlingReport/handling-report-list',component:HandlingReportListComponent},


{path:'shahinSpecialReport/location-certify',component:ShahinSpecialReportLocationCertifyComponent},

{path:'shahinSpecialReport/equipment-handling-performance-history-form',component:ShahinSpecialReportEquipmentHandlingPerformanceHistoryFormComponent},
{path:'shahinSpecialReport/equipment-handling-performance-history-list',component:ShahinSpecialReportEquipmentHandlingPerformanceHistoryListComponent},

{path:'shahinSpecialReport/loaded-container-form',component:ShahinSpecialReportLoadedContainerListFormComponent},
{path:'shahinSpecialReport/loaded-container-list',component:ShahinSpecialReportLoadedContainerListComponent},



{path:'DgReport/dg-container-delivery-report-form',component:DgContainerDeliveryReportFormComponent},
{path:'DgReport/dg-container-delivery-report-list',component:DgContainerDeliveryReportListComponent},




{path:'DgReport/dg-manifest-form',component:DgManifestFormComponent},
{path:'DgReport/dg-manifest-list',component:DgManifestListComponent},


{path:'exportReports/export-container-not-found/form',component:ExportContainerNotFoundReportFormComponent},
{path:'exportReports/export-container-not-found/list',component:ExportContainerNotFoundReportListComponent},



{path:'IgmOperation/todaysEdiDeclaration',component:TodaysEdiDeclarationComponent},
{path:'IgmOperation/todaysEdiDeclarationList/:id',component:TodaysEdiDeclarationListComponent},





  { path: 'gang/list', component:GangListComponent},
  { path: 'gang/add', component:GangAddComponent},
  { path: 'gang/edit/:id', component: GangEditComponent },
  { path: 'gang/assign/labor', component: LaborAssignComponent },

  { path: 'labor/add', component: LaborAddComponent },
  { path: 'labor/list', component: LaborListComponent },
  { path: 'labor/edit/:id', component: LaborEditComponent },
  { path: 'labor/info/:id', component: LaborInfoComponent },

  { path: 'gang/assignlabor/:id', component: LaborAssignListComponent },

  { path: 'gang/assign/location', component: AssignGangComponent},
  { path: 'gang/assigned/list', component: AssignedGangListComponent},
  { path: 'gang/assigned/edit/:id', component: AssignedGangEditComponent },

  { path: 'dg/dg-containers-discharge-summary-list-form', component: DgContainersDischargeSummaryListFormComponent},
  { path: 'dg/dg-cont-discharge-summary-list', component: DgContDischargeSummaryListComponent},

  { path:'importReports/equipmentHandlingPerformanceRtgHistory/form',component:EquipmentHandlingPeroformaceRtgComponent},
  { path:'importReports/equipmentHandlingPerformanceRtgHistory/report',component:EquipmentHandlingPerformanceReportRtgComponent},
  { path:'importReports/operatorRtgHandlingPerformance/form',component:OperatorRtgHandlingPerformanceComponent},
  { path:'importReports/operatorRtgHandlingPerformance/report',component:OperatorRtgHandlingPerformanceReportComponent},
  { path:'importReports/operatorScHandlingPerformance/form',component:OperatorScHandlingPerformaceComponent},
  { path:'importReports/operatorScHandlingPerformance/report',component:OperatorScHandlingPerformanceReportComponent},
  { path:'importReports/offDockDestinationWiseContainer/form',component:OffDockDestinationWiseContainerComponent},
  { path:'importReports/offDockDestinationWiseContainer/report',component:OffDockDestinationWiseContainerListComponent},

  { path:'exportReports/pod/list', component:PodListComponent},
  { path:'exportReports/iso/list',component:IsoCodeComponent},
  { path:'importReports/importContainerDischargeAndBalance/form',component:ImportContainerDischargeAndBalanceFormComponent},
  { path:'importReports/importContainerDischargeAndBalance/report',component:ImportContainerDischargeAndBalanceReportComponent},
  { path:'importReports/offDockWiseBlockedContainerList/List',component:OffDockBlockedContainerListComponent},
  { path:'importReports/removalListOfOverFlowYard/overflow',component:RemovalListOfOverFlowYardComponent},
  { path:'importReports/removalListOfOverFlowYard/report',component:RemovalListOfOverFlowYardReportComponent},
  { path: 'exportReports/copino/form', component: ExportCopinoFormComponent },
  { path: 'exportReports/copino/report', component: ExportCopinoReportComponent },
  { path:'exportReports/container-block-report/form',component:ExportContainerBlockReportFormComponent},
  { path:'exportReports/container-block-report/list',component:ExportContainerBlockReportListComponent},
  { path: 'dg/dg-containers-discharge-list-by-rotation-form', component: DgContainersDischargeListByRotationFormComponent},
  { path: 'dg/dg-containers-discharge-list-by-rotation', component: DgContainersDischargeListByRotationComponent},
  { path:'importReports/feederDischargeSummaryList/form',component:FeederDischargeSummaryListComponent},
  { path:'importReports/feederDischargeSummaryList/report',component:FeederDischargeSummaryListReportComponent},

  { path:'exportReports/export-destination-wise-mlo-loaded-container/form',component:ExportDestinationWiseMloLoadedContainerFormComponent},
  { path:'exportReports/export-destination-wise-mlo-loaded-container/list',component:ExportDestinationWiseMloLoadedContainerListComponent},

  { path:'exportReports/export-loaded-container-list-load-and-empty/form',component:ExportLoadedContainerListLoadAndEmptyFormComponent},
  { path:'exportReports/export-loaded-container-list-load-and-empty/list',component:ExportLoadedContainerListLoadAndEmptyListComponent},

  { path:'exportReports/export-rotation-wise-export-container/form',component:ExportRotationWiseExportContainerFormComponent},
  { path:'exportReports/export-rotation-wise-export-container/list',component:ExportRotationWiseExportContainerListComponent},
  { path:'exportReports/mlo-wise-export-summary/form',component:ExportMloWiseExportSummaryFormComponent},
  { path:'exportReports/mlo-wise-export-summary/list',component:ExportMloWiseExportSummaryListComponent},
  { path:'exportReports/mlo-wise-excel-uploaded-report/form',component:ExportMloWiseExcelUploadedReportFormComponent},
  { path:'exportReports/mlo-wise-excel-uploaded-report/list',component:ExportMloWiseExcelUploadedReportListComponent},
  { path:'importReports/importContainerDischargeExcelDetailLast24Hour/form',component:ImportContainerDischargeExcelDetailLast24HourComponent},
  { path:'importReports/importContainerDischargeExcelDetailLast24Hour/detail',component:ImportContainerDischargeExcelDetailLast24HourReportDetailComponent},
  { path:'importReports/importContainerDischargeExcelDetailLast24Hour/summary',component:ImportContainerDischargeExcelDetailLast24HourReportSummaryComponent},
  { path:'importReports/mloWiseImportLoadedContainerSummary/form',component:MloWiseImportLoadedContainerSummaryComponent},
  { path:'importReports/mloWiseImportLoadedContainerSummaryReport/report',component:MloWiseImportLoadedContainerSummaryReportComponent},
  { path:'exportReports/export-excel-upload-sample-with-loaded-container/form',component:ExportExcelUploadSampleWithLoadedContainerFormComponent},
  { path:'exportReports/export-excel-upload-sample-with-loaded-container/list',component:ExportExcelUploadSampleWithLoadedContainerListComponent},
  { path:'exportReports/date-and-rotation-wise-pre-advised-container/form',component:ExportDateAndRotationWisePreAdvisedContainerFormComponent},
  { path:'exportReports/date-and-rotation-wise-pre-advised-container/list',component:ExportDateAndRotationWisePreAdvisedContainerListComponent},
  { path:'exportReports/comments-by-shipping-section-on-export-vessel/form',component:ExportCommentsByShippingSectionOnExportVesselFormComponent},
  { path:'exportReports/comments-by-shipping-section-on-export-vessel/list',component:ExportCommentsByShippingSectionOnExportVesselListComponent},
  { path:'exportReports/export-rotation-wise-container-information/form',component:ExportRotationWiseContainerInformationFormComponent},
  { path:'exportReports/export-rotation-wise-container-information/list',component:ExportRotationWiseContainerInformationListComponent},
  { path:'exportReports/export-vessel-list-with-status/form',component:ExportVesselListWithStatusFormComponent},
  { path:'exportReports/export-vessel-list-with-status-detail-list',component:ExportVesselListWithStatusDetailListComponent},
  { path:'exportReports/export-vessel-list-with-status-summary-list',component:ExportVesselListWithStatusSummaryListComponent},
  { path:'exportReports/export-container-to-be-loaded/form',component:ExportContainerToBeLoadedFormComponent},
  { path:'exportReports/export-container-to-be-loaded/list',component:ExportContainerToBeLoadedListComponent},
  { path:'exportReports/export-loaded-container/form',component:ExportLoadedContainerFormComponent},
  { path:'exportReports/export-loaded-container/list',component:ExportLoadedContainerListComponent},



  {path:'exportReports/mlo-wise-pre-advised-loaded-container-list-form',component:ExportMloWisePreAdvisedLoadedContainerListFormComponent},
  {path:'exportReports/mlo-wise-pre-advised-loaded-container-list',component:ExportMloWisePreAdvisedLoadedContainerListComponent},
  {path:'exportReports/mlo-wise-pre-advised-view-list',component:ExportMloWisePreAdviceViewListComponent},
  {path:'exportReports/mlo-wise-summary-list',component:ExportMloWiseSummaryListComponent},



  {path:'exportReports/export-container-loading-excel-report/form',component:ExportContainerLoadingExcelReportFormComponent},
  {path:'exportReports/export-container-loading-excel-report/list',component:ExportContainerLoadingExcelReportListComponent},

  {path:'shahinSpecialReport/shahin-mlo-wise-loading-export-report-form',component:ShahinMloWiseFinalLoadingExportReportFormComponent},
  {path:'shahinSpecialReport/shahin-mlo-wise-loading-export-report-list',component:ShahinMloWiseFinalLoadingExportReportListComponent},
  {path:'shahinSpecialReport/shahin-mlo-wise-loading-details-export-report-list',component:ShahinMloWiseFinalLoadingDetailsExportReportListComponent},



  {path:'importReports/removalListOfOverFlowYardLcl/overflow',component:RemovalListOfOverFlowYardLclComponent},
  {path:'importReports/removalListOfOverFlowYardLcl/report',component:RemovalListOfOverFlowYardLclReportComponent},

  {path:'importReports/mloDischargeSummaryList/form',component:MloDischargeSummaryListComponent},
  {path:'importReports/mloDischargeSummaryListReport/report',component:MloDischargeSummaryListReportComponent},

  {path:'importReports/containerDischargeListApp/form',component:ContainerDischargeListAppComponent},
  {path:'importReports/containerDischargeListAppReport/report',component:ContainerDischargeListAppReportComponent},

  {path:'importReports/importContainerDischargeSummaryLast24Hour/form',component:ImportContainerDischargeSummaryLast24HourComponent},
  {path:'importReports/importContainerDischargeSummaryLast24HourReport/report',component:ImportContainerDischargeSummaryLast24HourReportComponent},

  { path: 'role/add', component: RoleAddComponent },
  { path: 'role/list', component: RoleListComponent },
  { path: 'role/edit/:id', component: RoleEditComponent },

  { path: 'organization/add', component: OrganizationAddComponent },
  { path: 'organization/list', component: OrganizationListComponent },
  { path: 'organization/edit/:id', component: OrganizationEditComponent },

  { path: 'user/add', component: UserAddComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user/edit/:id', component: UserEditComponent },

  { path: 'module/add', component:ModuleAddComponent},
  { path: 'module/edit/:id', component:ModuleEditComponent },
  { path: 'module/list', component:ModuleListComponent },

  { path: 'url/list', component:UrlListComponent },
  { path: 'url/add', component:UrlAddComponent},
  { path: 'url/edit/:id', component:UrlEditComponent },

  //All Assignment
  {path:'importReports/allAssignmentDeliveryAndEmptyDetail/form',component:AllAssignmentDeliveryAndEmptyDetailParentComponent},

  {path:'importReports/assignmentDeliveryAndEmptyDetail/report',component:AssignmentAndDeliveryEmptyDetailReportComponent},
  {path:'importReports/yardWiseAssignmentAndDeliveryEmptyDetail/report',component:YardWiseAssignmentAndDeliveryEmptyDetailReportComponent},

  {path:'importReports/containerSearch',component:ContainerSearchReportComponent},
  {path:'importReports/assignmentAndDeliveryEmptySummary/report',component:AssignmentAndDeliveryEmptySummaryReportComponent},
  {path:'importReports/listOfNotStrippedAssignmentDeliveryContainers/report',component:ListOfNotStrippedAssignmentDeliveryContainersReportComponent},
  {path:'importReports/AppraiseReSlotLocation/report',component:AppraiseReSlotLocationReportComponent},
  {path:'importReports/HeadDeliveryRegisterCctNct/report',component:HeadDeliveryRegisterReportComponent},
  {path:'importReports/HeadDeliveryRegisterGcb/report',component:HeadDeliveryRegisterGcbComponent},
  {path:'importReports/MisAssignmentCctNct/report',component:MisAssignmentReportComponent},
  {path:'importReports/MisAssignmentGcb/report',component:MisAssignmentGcbReportComponent},


  //Import Cotainer Bay View

  {path:'importReports/importContainerBayView/form',component:ImportContainerBayViewComponent},
  {path:'importReports/ImportContainerBayView/report',component:ImportContainerBayViewReportComponent},

  //Export Container Bay View
  {path:'exportReports/exportContainerBayView/form',component:ExportContainerBayViewComponent},
  {path:'exportReports/exportContainerBayView/report',component:ExportContainerBayViewReportComponent},

  //Export Blank Bay View
  {path:'exportReports/exportBlankBayView/form',component:ExportBlankBayViewComponent},
  {path:'exportReports/exportBlankBayView/report',component:ExportBlankBayViewReportComponent},

  { path: 'lcl/assignment/report', component:LclAssignmentReportComponent},

  //Upload Export Container Excel File
  {path:'exportReports/uploadExportContainerExcelFile/form',component:UploadExportContainerExcelFileComponent},




  //Upload Excel File For Pangaon
  {path:'Pangaon/UploadExcelForPangaon/form',component:UploadExcelForPangaonComponent},




  
  //Container Location
  { path: 'container/location/form', component:ContainerLocationFormComponent},
  { path: 'container/location/details/:containerNumber', component:ContainerLocationDetailsComponent},
  { path: 'lcl/container/location/form', component:LclContainerLocationFormComponent},
  { path: 'privilege/add', component:PrivilegeAddComponent},

//Equipment HandlingPerformace Rtg Time Wise (Shahin Special Report)
  {path:'shahinSpecialReports/EquipmentHandlingPerformaceRtgTimeWise/form',component:EquipmentHandlingPerformaceRtgTimeWiseComponent},
  {path:'shahinSpecialReports/EquipmentHandlingPerformaceRtgTimeWise/report',component:EquipmentHandlingPerformaceRtgTimeWiseReportComponent},

//Convert Pangaon Container
  {path:'Pangaon/ConvertPangaonContainer/form',component:ConvertPangaonContainerComponent},
// Update Vessel For Export Containers
  {path:'shahinSpecialReports/UpdateVesselForExportContainers/form',component:UpdateVesselForExportContainersComponent},

  // Change Password
  {path:'accountSetting/VerifyCellNumber/form',component:VerifyCellNumberComponent},
  {path:'accountSetting/ChangePassword/form',component:ChangePasswordComponent},

// Two Step Verification
  {path:'accountSetting/verifyCellNumberForTwoStepVerification/form',component:VerifyCellNumberForTwoStepVerificationComponent},
  {path:'accountSetting/TwoStepVerification/form',component:TwoStepVerificationComponent},

  //IGM Cotainer List Shahin Report
  {path:'shahinSpecialReports/igmContainerList',component:IgmContainerListComponent},

  //View igm general
  {path:'igmOperation/viewIgmGeneral/BB/:limit/:start/:state',component:ViewIgmGeneralComponent},
  {path:'igmOperation/viewIgmGeneral/GM/:limit/:start/:state',component:ViewIgmGeneralComponent},
  {path:'igmOperation/ediUpload/:id',component:EdiUploadComponent},
  { path: 'feeder/discharge/summary', component:FeederDischargeSummaryComponent },



  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
