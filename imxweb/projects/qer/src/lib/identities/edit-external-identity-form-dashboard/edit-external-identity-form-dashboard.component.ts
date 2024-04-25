// import { OverlayRef } from '@angular/cdk/overlay';
// import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
// import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { MatTabGroup } from '@angular/material/tabs';
// import { Router } from '@angular/router';
// import { EUI_SIDESHEET_DATA, EuiLoadingService, EuiSidesheetService, EuiSidesheetRef } from '@elemental-ui/core';
// import { TranslateService } from '@ngx-translate/core';
// import { FeatureConfig, QerProjectConfig, PortalPersonReports, PortalAdminPerson, RequestableProductForPerson } from 'imx-api-qer';
// import { IEntity, DbObjectKey } from 'imx-qbm-dbts';
// import { ColumnDependentReference, TabItem, ClassloggerService, SnackBarService, ConfirmationService, SystemInfoService, ExtService, CdrFactoryService, AuthenticationService, BaseCdr } from 'qbm';
// import { Subscription } from 'rxjs';
// import { FeatureConfigService } from '../../admin/feature-config.service';
// import { PasscodeService } from '../../ops/passcode.service';
// import { QerApiService } from '../../qer-api-client.service';
// import { RiskAnalysisSidesheetComponent } from '../../risk/riskanalysis-sidesheet.component';
// import { CartItemsService } from '../../shopping-cart/cart-items.service';
// import { IdentitiesReportsService } from '../identities-reports.service';
// import { IdentitiesService } from '../identities.service';

import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EuiLoadingService, EuiSidesheetService, EUI_SIDESHEET_DATA, EuiSidesheetRef } from '@elemental-ui/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { IdentitiesService } from '../identities.service';
import { FeatureConfig, PortalAdminPerson, PortalPersonReports, QerProjectConfig, RequestableProductForPerson } from 'imx-api-qer';
import {
ColumnDependentReference,
ClassloggerService,
BaseCdr,
SnackBarService,
AuthenticationService,
SystemInfoService,
ConfirmationService,
TabItem,
ExtService,
CdrFactoryService,
} from 'qbm';
import { CompareOperator, DbObjectKey, FilterData, FilterType, IEntity } from 'imx-qbm-dbts';
import { IdentitiesReportsService } from '../identities-reports.service';
import { PasscodeService } from '../../ops/passcode.service';
import { QerApiService } from '../../qer-api-client.service';
import { RiskAnalysisSidesheetComponent } from '../../risk/riskanalysis-sidesheet.component';
import { FeatureConfigService } from '../../admin/feature-config.service';
import { CartItemsService } from '../../shopping-cart/cart-items.service';
import { CCCApiService } from '../../ccc-api-client-service';
import { PortalCartorderCreatenew, PortalConfigparmGetconfigparmtest } from 'imx-api-gesloplugin';

@Component({
  selector: 'ccc-edit-external-identity-form-dashboard',
  templateUrl: './edit-external-identity-form-dashboard.component.html',
  styleUrls: ['./edit-external-identity-form-dashboard.component.scss']
})
export class EditExternalIdentityFormDashboardComponent implements OnInit,  OnDestroy {

  // @ViewChild('tabs') public tabs: MatTabGroup;

  // public readonly detailsFormGroup: UntypedFormGroup;
  // public cdrList: ColumnDependentReference[] = [];
  // public cdrListPersonal: ColumnDependentReference[] = [];
  // public cdrListOrganizational: ColumnDependentReference[] = [];
  // public cdrListLocality: ColumnDependentReference[] = [];
  // public valueChanges$: Subscription;
  // public readonly parameters: { objecttable: string; objectuid: string };
  // public canAnalyzeRisk = false;
  // public isActiveFormControl = new UntypedFormControl();
  // public isSecurityIncidentFormControl = new UntypedFormControl();
  // public dynamicTabs: TabItem[] = [];

  // private readonly subscriptions: Subscription[] = [];
  // private currentUserUid: string;
  // private featureConfig: FeatureConfig;
  // // dummyTrigger: boolean = false;
  //  //Code by Gnana
  //  private personData: IEntity;
  //  private map = new Map<string, string>();
  //  private personalColumns: string[];

  // constructor(
  //   @Inject(EUI_SIDESHEET_DATA)
  //   public data: {
  //     isAdmin: boolean;
  //     projectConfig: QerProjectConfig;
  //     selectedIdentity: PortalPersonReports | PortalAdminPerson;
  //     canEdit: boolean;
  //   },
  //   public identities: IdentitiesService,
  //   private readonly reports: IdentitiesReportsService,
  //   private readonly logger: ClassloggerService,
  //   private readonly busyService: EuiLoadingService,
  //   private readonly snackbar: SnackBarService,
  //   private readonly sidesheet: EuiSidesheetService,
  //   private readonly sidesheetRef: EuiSidesheetRef,
  //   private readonly confirmationService: ConfirmationService,
  //   private readonly passcodeService: PasscodeService,
  //   private readonly api: QerApiService,
  //   private readonly router: Router,
  //   private readonly systemInfoService: SystemInfoService,
  //   private readonly translate: TranslateService,
  //   private readonly extService: ExtService,    
  //   private readonly featureConfigService: FeatureConfigService,
  //   private readonly cdrFactoryService: CdrFactoryService,
  //   // code by gnana
  //   private readonly cartservice: CartItemsService,
  //   // private cdr: ChangeDetectorRef,
  //   authentication: AuthenticationService,
  //   confirm: ConfirmationService
  // ) {
  //   this.subscriptions.push(
  //     this.sidesheetRef.closeClicked().subscribe(async (result) => {
  //       if (this.detailsFormGroup.dirty) {
  //         const close = await confirm.confirmLeaveWithUnsavedChanges();
  //         if (close) {
  //           this.sidesheetRef.close();
  //         }
  //       } else {
  //         this.sidesheetRef.close(result);
  //       }
  //     })
  //   );

  //   //Code by Gnana start
  //   this.personData = this.data.selectedIdentity.GetEntity();
  //   // this.personalColumns = this.data.projectConfig.OwnershipConfig.PrimaryFields['Person'];
 
  //   // moje
  //   this.personalColumns = ['Gender', 'FirstName', 'MiddleName'];
 
  //   // this.personalColumns = this.data.projectConfig.OwnershipConfig.PrimaryFields['Person'];
 
  //   for (let i = 0; i < this.personalColumns.length; i++) {
  //     this.map.set(this.personalColumns[i], this.personData.GetColumn(this.personalColumns[i]).GetValue());
  //   }
 
  //   //Code by Gnana End


  //   this.subscriptions.push(authentication.onSessionResponse.subscribe((sessionState) => (this.currentUserUid = sessionState.UserUid)));

  //   this.detailsFormGroup = new UntypedFormGroup({});
  //   this.parameters = {
  //     objecttable: PortalPersonReports.GetEntitySchema().TypeName,
  //     objectuid: data.selectedIdentity.GetEntity().GetKeys()[0],
  //   };

  //   this.systemInfoService
  //     .get()
  //     .then((i) => (this.canAnalyzeRisk = i.PreProps.includes('RISKINDEX') && data.selectedIdentity.RiskIndexCalculated.value > 0));
  // }

  // get isIdentityMarkedForDelete(): boolean {
  //   let result = false;
  //   if (this.data.selectedIdentity && this.data.selectedIdentity.XMarkedForDeletion) {
  //     result = this.data.selectedIdentity.XMarkedForDeletion.value === 1;
  //   }
  //   return result;
  // }

  // public get canMarkedAsIncident(): boolean {
  //   return this.currentUserUid !== this.data.selectedIdentity.GetEntity().GetKeys()[0];
  // }

  // public get canGeneratePasscode(): boolean {
  //   return this.featureConfig?.EnableSetPasswords && this.data.selectedIdentity.UID_PersonHead.value === this.currentUserUid;
  // }

  // public async ngOnInit(): Promise<void> {
  //   return this.setup();
  // }

  // public ngOnDestroy(): void {
  //   if (this.valueChanges$) {
  //     this.valueChanges$.unsubscribe();
  //   }

  //   this.subscriptions.forEach((s) => s.unsubscribe());
  // }

  // public cancel(): void {
  //   this.closeSidesheet();
  // }

  // public async personsManagedReport(): Promise<void> {
  //   this.reports.personsManagedReport(
  //     this.data.selectedIdentity.GetEntity().GetKeys()[0],
  //     '#LDS#Download report on identities this identity is directly responsible for'
  //   );
  // }

  // public async personsReport(): Promise<void> {
  //   this.reports.personsReport(this.data.selectedIdentity);
  // }

  // public async initiateDelete(): Promise<void> {
  //   if (
  //     await this.confirmationService.confirm({
  //       Title: '#LDS#Heading Delete Identity',
  //       Message: '#LDS#Are you sure you want to delete the identity?',
  //     })
  //   ) {
  //     const overlayRef = this.busyService.show();
  //     try {
  //       const result = await this.identities.deleteIdentity(this.data.selectedIdentity.GetEntity().GetKeys()[0]);
  //       if (result) {
  //         this.snackbar.open({ key: '#LDS#The identity will be deleted. This may take some time.' });
  //         this.closeSidesheet();
  //       }
  //     } finally {
  //       this.busyService.hide(overlayRef);
  //     }
  //   }
  // }

  // public async save(): Promise<void> {
  //   if (this.detailsFormGroup.valid) {
  //     this.logger.debug(this, `Saving identity manager change`);
  //     const overlayRef = this.busyService.show();
  //     try {
  //       await this.data.selectedIdentity.GetEntity().Commit(true);
  //       this.detailsFormGroup.markAsPristine();
  //       this.snackbar.open({ key: '#LDS#The changes have been successfully saved.' });
  //       this.closeSidesheet();
  //     } finally {
  //       this.busyService.hide(overlayRef);
  //     }
  //   }
  // }

  // //code by gnana
  // private getDirtyValues(form: any) {
  //   let dirtyValues = {};
 
  //   Object.keys(form.controls).forEach((key) => {
  //     let currentControl = form.controls[key];
 
  //     if (currentControl.dirty) {
  //       if (currentControl.controls) dirtyValues[key] = this.getDirtyValues(currentControl);
  //       else dirtyValues[key] = currentControl.value;
  //     }
  //   });
 
  //   return dirtyValues;
  // }

  // public async createPWO(): Promise<void> {
  //   //const sdd = this.cartservice.getItemsForCart();
 
  //   //this.itshopProvider.deleteShoppingCart();
 
  //   var columnsToMonitor = this.personalColumns;
 
  //   const changedCtrl = this.getDirtyValues(this.detailsFormGroup);
  //   let str = '';
 
  //   if (Object.keys(changedCtrl).length > 0) {
  //     columnsToMonitor.forEach(function (ctrlID) {
  //       Object.keys(changedCtrl).forEach((key) => {
  //         if (key === ctrlID) {
  //           str = str + ctrlID + '=' + changedCtrl[key] + '~';
  //         }
  //       });
  //     });
 
  //     for (let i = 0; i < columnsToMonitor.length; i++) {
  //       this.detailsFormGroup.controls[columnsToMonitor[i]].setValue(this.map.get(columnsToMonitor[i]));
  //     }
  //   }
  //   if (str.length > 0) {
  //     str = str.substring(0, str.length - 1);
  //   }
  //   const requestableProductForPerson: RequestableProductForPerson = {
  //     UidPerson: this.data.selectedIdentity.GetEntity().GetKeys()[0],
  //     // hardcoded uid
  //     UidITShopOrg: '5AC6B83E-CC0F-4618-9451-12EC63211BD5',
  //     UidAccProduct: '0a0315db-fa31-4d32-80b8-65fcb0ce6f72',
  //     Display: 'Validate Person Fields',
  //     DisplayRecipient: this.personData.GetDisplay(),
  //   };
  //   const requestableServiceItemsFor: RequestableProductForPerson[] = [];
  //   requestableServiceItemsFor.push(requestableProductForPerson);
 
  //   this.cartservice.createCartandSubmit(requestableServiceItemsFor, str);
  // }

  // public async onIsSecurityIncidentToggleChanged(toggleChange: MatSlideToggleChange): Promise<void> {
  //   const message = this.data.selectedIdentity.IsSecurityIncident.value
  //     ? '#LDS#Are you sure this identity does not pose a security risk anymore?'
  //     : '#LDS#Are you sure this identity poses a security risk?';
  //   const title = this.data.selectedIdentity.IsSecurityIncident.value
  //     ? '#LDS#Heading Resolve Security Risk'
  //     : '#LDS#Heading Mark Identity as Security Risk';

  //   const result = await this.confirmationService.confirm({
  //     Title: title,
  //     Message: message,
  //   });

  //   if (!result) {
  //     this.isSecurityIncidentFormControl.setValue(!toggleChange.checked);
  //     return;
  //   }
  //   this.data.selectedIdentity.IsSecurityIncident.value = !this.data.selectedIdentity.IsSecurityIncident.value;
  // }

  // public onIsActiveToggleChanged(toggleChange: MatSlideToggleChange): void {
  //   // Invert the toggle value to match with the inverted state of the column 'IsInActive'
  //   const value = !toggleChange?.checked;
  //   if (this.data.selectedIdentity.IsInActive.GetMetadata().CanEdit()) {
  //     this.data.selectedIdentity.IsInActive.value = value;
  //   }
  // }

  // public async analyzeRisk(): Promise<void> {
  //   this.sidesheet.open(RiskAnalysisSidesheetComponent, {
  //     title: await this.translate.get('#LDS#Heading Analyze Risk').toPromise(),
  //     subTitle: this.data.selectedIdentity.GetEntity().GetDisplay(),
  //     padding: '0px',
  //     width: '60%',
  //     testId: 'identity-sidesheet-analyze-risk-sidesheet',
  //     data: { objectKey: new DbObjectKey('Person', this.data.selectedIdentity.GetEntity().GetKeys()[0]).ToXmlString() },
  //   });
  // }

  // public async generatePasscode(): Promise<void> {
  //   let passcode;
  //   let overlayRef: OverlayRef;
  //   setTimeout(() => (overlayRef = this.busyService.show()));
  //   try {
  //     passcode = await this.passcodeService.getPasscodeWithPortalLogin(this.data.selectedIdentity.GetEntity().GetKeys()[0]);
  //   } finally {
  //     setTimeout(() => this.busyService.hide(overlayRef));
  //   }
  //   if (!passcode) {
  //     return;
  //   }
  //   return this.passcodeService.showPasscode(
  //     passcode,
  //     this.data.selectedIdentity.GetEntity().GetDisplay(),
  //     null,
  //     await this.passcodeService.getValidationDuration()
  //   );
  // }

  // public async onAssignManager(): Promise<void> {
  //   this.busyService.show();

  //   try {
  //     const carts = await this.api.typedClient.PortalItshopCart.Get();
  //     const param = this.api.typedClient.PortalPersonRequestmanagerchange.createEntity();
  //     param.UID_PersonOrdered.value = this.data.selectedIdentity.GetEntity().GetKeys()[0];
  //     if (carts.totalCount > 0) {
  //       param.UID_ShoppingCartOrder.value = carts.Data[0].GetEntity().GetKeys()[0];
  //     }

  //     await this.api.typedClient.PortalPersonRequestmanagerchange.Post(this.data.selectedIdentity.GetEntity().GetKeys()[0], param);
  //   } finally {
  //     this.busyService.hide();
  //     this.sidesheetRef.close();
  //     this.snackbar.open({ key: '#LDS#The assignment of the manager has been successfully added to your shopping cart.' });
  //     this.router.navigate(['shoppingcart']);
  //   }
  // }

  // public update(cdr: ColumnDependentReference, list: ColumnDependentReference[]): void {
  //   const index = list.findIndex((elem) => elem.column.ColumnName === cdr.column.ColumnName);
  //   if (index === -1) {
  //     return;
  //   }

  //   this.detailsFormGroup.removeControl(cdr.column.ColumnName);
  //   list.splice(index, 1, new BaseCdr(cdr.column));
  // }

  // private closeSidesheet(): void {
  //   this.sidesheetRef.close();
  // }

  // private async setup(): Promise<void> {
  //   // Resolve an issue where the mat-tab navigation arrows could appear on first load
  //   this.subscriptions.push(
  //     this.sidesheetRef.componentInstance.onOpen().subscribe(() => {
  //       // Recalculate header
  //       this.tabs.updatePagination();
  //     })
  //   );

  //   // Handle the IsInActive column outside the context of a CDR editor so the UI can invert the meaning to make more sense to the user
  //   // This should be inversed on the api data response at some point, but until then we handle it in the UI
  //   this.isActiveFormControl.setValue(!this.data.selectedIdentity.IsInActive.value);
  //   this.detailsFormGroup.addControl(this.data.selectedIdentity.IsInActive.Column.ColumnName, this.isActiveFormControl);


  //   const customPersonalColumns = [
  //     'LastName',
  //     'FirstName',
  //     'MiddleName',
  //     'BirthDate',
  //     'PersonnelNumber',
  //     'Gender',
  //     'CentralAccount',
  //     'DefaultEmailAddress',
  //     // 'IsPwdResetByHelpdeskAllowed'
  //   ];

  //   const customColumns = [
  //     'FirstName',
  //     'LastName',
  //     'Salutation',
  //     'Title',
  //     'NameAddOn',
  //     'PhoneMobile',
  //     'ContactEmail',
  //     'CCC_UID_JobPosition',
  //     'UID_FirmPartner',
  //     'UID_Department',
  //     'UID_PersonHead',
  //     'CCC_ContractNumber',
  //     'CCC_365',
  //     'CCC_PhysicalAccess',
  //     'UID_ProfitCenter',
  //     'CCC_Capex',
  //     'CCC_DomainAccount',
  //     'CCC_Jira',
  //     'ExitDate',
  //     'Remarks',
  //     'EmployeeType',
  //     'IsExternal',
  //     'JPegPhoto',
  //   ];

  //   const readOnlyColumns = ['EmployeeType', 'CCC_DomainAccount'];

  //   const defaultValues = {
  //     'EmployeeType': 'Consultant', // Set your default value here,
  //     'IsExternal': true,
  //   };

    
  //   // const personalColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_Attributes;
  //   // const personalColumns = customPersonalColumns;
  //   // this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList(this.data.selectedIdentity.GetEntity(), personalColumns, !this.data.canEdit);

  //   //const personalColumns = customColumns;
  //   //this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), personalColumns);

  //   this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), customColumns, readOnlyColumns, defaultValues);

  // //   this.cdrListPersonal.forEach((cdr: ColumnDependentReference) => {
  // //     const columnName = cdr.column.ColumnName;
  // //     const metadata = cdr.column.GetMetadata();
  // //     const dataType = cdr.column.GetType();
      
  // //     console.log(`Column Name: ${columnName}`);
  // //     console.log(`Data Type: ${dataType}`);
  // //     console.log(`Metadata:`, metadata); // This will contain additional information about the column

  // //     if (columnName === 'UID_PersonHead') {
  // //       metadata['IsReadOnly'] = false;
  // //       this.dummyTrigger = !this.dummyTrigger;
  // //       console.log(`Updated Metadata:`, metadata); // Confirm the update
  // //     }
  // // });
  // // const updatedCdrListPersonal: ColumnDependentReference[] = [];
  
  //   // this.cdrListPersonal.forEach(cdr => {
  //   //   const updatedCdr = { ...cdr }; // Create a copy of the original cdr
  //   //   if (cdr.column.ColumnName === 'UID_PersonHead') {
  //   //     console.log("///////COLUMN///////////");
  //   //     console.dir(cdr.column);
  //   //     cdr.column['data']['IsReadOnly'] = false; 
  //   //     // cdr.column.data.IsReadOnly = false; // Modify IsReadOnly in data object
  //   //     // cdr.column.metaColumn.IsReadOnly = false; // Modify IsReadOnly in metaColumn object
  //   //   }
  //   //   // updatedCdrListPersonal.push(updatedCdr); // Add the updated cdr to the new array
  //   // });

  //   // Finally, assign the new array to cdrListPersonal
  //   // this.cdrListPersonal = updatedCdrListPersonal;
  //   // this.cdr.detectChanges();


  //   // const organizationalColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_OrganizationalAttributes;
  //   // this.cdrListOrganizational = this.cdrFactoryService.buildCdrFromColumnList(
  //   //   this.data.selectedIdentity.GetEntity(),
  //   //   organizationalColumns, !this.data.canEdit
  //   // );

  //   // const localityColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_LocalityAttributes;
  //   // this.cdrListLocality = this.cdrFactoryService.buildCdrFromColumnList(this.data.selectedIdentity.GetEntity(), localityColumns, !this.data.canEdit);

  //   this.isSecurityIncidentFormControl.setValue(this.data.selectedIdentity.IsSecurityIncident.value);
  //   this.detailsFormGroup.addControl(this.data.selectedIdentity.IsSecurityIncident.Column.ColumnName, this.isSecurityIncidentFormControl);

  //   this.busyService.show();
  //   try {
  //     this.featureConfig = await this.featureConfigService.getFeatureConfig();
  //     this.dynamicTabs = (
  //       await this.extService.getFittingComponents<TabItem>('identitySidesheet', (ext) => ext.inputData.checkVisibility(this.parameters))
  //     ).sort((tab1: TabItem, tab2: TabItem) => tab1.sortOrder - tab2.sortOrder);
  //   } finally {
  //     this.busyService.hide();
  //   }
  // }

  @ViewChild('tabs') public tabs: MatTabGroup;

  public readonly detailsFormGroup: UntypedFormGroup;
  public cdrList: ColumnDependentReference[] = [];
  public cdrListPersonal: ColumnDependentReference[] = [];
  public cdrListOrganizational: ColumnDependentReference[] = [];
  public cdrListLocality: ColumnDependentReference[] = [];
  public valueChanges$: Subscription;
  public readonly parameters: { objecttable: string; objectuid: string };
  public canAnalyzeRisk = false;
  public isActiveFormControl = new UntypedFormControl();
  public isSecurityIncidentFormControl = new UntypedFormControl();
  public dynamicTabs: TabItem[] = [];

  private readonly subscriptions: Subscription[] = [];
  private currentUserUid: string;
  private featureConfig: FeatureConfig;
  private personData:IEntity;
  private map = new Map<string,string>();
  private personalColumns :string[];

  constructor(
      @Inject(EUI_SIDESHEET_DATA)
          public data: {
              isAdmin: boolean;
              projectConfig: QerProjectConfig;
              selectedIdentity: PortalPersonReports | PortalAdminPerson;
              canEdit: boolean;
          },
          public identities: IdentitiesService,
          private readonly reports: IdentitiesReportsService,
          private readonly logger: ClassloggerService,
          private readonly busyService: EuiLoadingService,
          private readonly snackbar: SnackBarService,
          private readonly sidesheet: EuiSidesheetService,
          private readonly sidesheetRef: EuiSidesheetRef,
          private readonly confirmationService: ConfirmationService,
          private readonly passcodeService: PasscodeService,
          private readonly api: QerApiService,
          private readonly router: Router,
          private readonly systemInfoService: SystemInfoService,
          private readonly translate: TranslateService,
          private readonly extService: ExtService,
          private readonly featureConfigService: FeatureConfigService,
          private readonly cdrFactoryService: CdrFactoryService,
          private readonly cartservice: CartItemsService,
          private readonly cccclientService:CCCApiService,

          authentication: AuthenticationService,
          confirm: ConfirmationService
       ) {
          this.subscriptions.push(
          this.sidesheetRef.closeClicked().subscribe(async (result) => {
          if (this.detailsFormGroup.dirty) {
           const close = await confirm.confirmLeaveWithUnsavedChanges();
          if (close) {
  this.sidesheetRef.close();
  }
  } else {
  this.sidesheetRef.close(result);
  }
  })
  );

  // tole je personal columns katerega jaz kasneje overwritam!!!!!!!!!!!!
this.personData= this.data.selectedIdentity.GetEntity();
this.personalColumns = this.data.projectConfig.OwnershipConfig.PrimaryFields["Person"];
// this.personalColumns = ['Gender', 'FirstName', 'MiddleName'];

// this.personalColumns = [
//   'FirstName',
//   'LastName',
//   'Salutation',
//   'Title',
//   'NameAddOn',
//   'PhoneMobile',
//   'ContactEmail',
//   'CCC_UID_JobPosition',
//   'UID_FirmPartner',
//   'UID_Department',
//   'UID_PersonHead',
//   'CCC_ContractNumber',
//   'CCC_365',
//   'CCC_PhysicalAccess',
//   'UID_ProfitCenter',
//   'CCC_Capex',
//   //'CCC_DomainAccount',
//   'CCC_Jira',
//   'ExitDate',
//   'Remarks',
//   'EmployeeType',
//   'IsExternal',
//   'JPegPhoto',
// ];



for (let i=0;i<this.personalColumns.length;i++){

this.map.set(this.personalColumns[i],this.personData.GetColumn(this.personalColumns[i]).GetValue());
}

// for (let i = 0; i < this.personalColumns.length; i++) {
//   const columnValue = this.personData.GetColumn(this.personalColumns[i])?.GetValue();
//   console.log(columnValue);
//   if (columnValue !== undefined || columnValue !== "") {
//       this.map.set(this.personalColumns[i], columnValue);
//   }
// }


this.subscriptions.push(authentication.onSessionResponse.subscribe((sessionState) => (this.currentUserUid = sessionState.UserUid)));

this.detailsFormGroup = new UntypedFormGroup({});
this.parameters = {
objecttable: PortalPersonReports.GetEntitySchema().TypeName,
objectuid: data.selectedIdentity.GetEntity().GetKeys()[0],
};

this.systemInfoService
.get()
.then((i) => (this.canAnalyzeRisk = i.PreProps.includes('RISKINDEX') && data.selectedIdentity.RiskIndexCalculated.value > 0));
}

get isIdentityMarkedForDelete(): boolean {
let result = false;
if (this.data.selectedIdentity && this.data.selectedIdentity.XMarkedForDeletion) {
result = this.data.selectedIdentity.XMarkedForDeletion.value === 1;
}
return result;
}

public get canMarkedAsIncident(): boolean {
return this.currentUserUid !== this.data.selectedIdentity.GetEntity().GetKeys()[0];
}

public get canGeneratePasscode(): boolean {
return this.featureConfig?.EnableSetPasswords && this.data.selectedIdentity.UID_PersonHead.value === this.currentUserUid;
}

public async ngOnInit(): Promise<void> {
return this.setup();
}

public ngOnDestroy(): void {
if (this.valueChanges$) {
this.valueChanges$.unsubscribe();
}

this.subscriptions.forEach((s) => s.unsubscribe());
}

public cancel(): void {
this.closeSidesheet();
}

public async personsManagedReport(): Promise<void> {
this.reports.personsManagedReport(
this.data.selectedIdentity.GetEntity().GetKeys()[0],
'#LDS#Download report on identities this identity is directly responsible for'
);
}

public async personsReport(): Promise<void> {
this.reports.personsReport(this.data.selectedIdentity);
}

public async initiateDelete(): Promise<void> {
if (
await this.confirmationService.confirm({
Title: '#LDS#Heading Delete Identity',
Message: '#LDS#Are you sure you want to delete the identity?',
})
) {
const overlayRef = this.busyService.show();
try {
const result = await this.identities.deleteIdentity(this.data.selectedIdentity.GetEntity().GetKeys()[0]);
if (result) {
this.snackbar.open({ key: '#LDS#The identity will be deleted. This may take some time.' });
this.closeSidesheet();
}
} finally {
this.busyService.hide(overlayRef);
}
}
}

public async save(): Promise<void> {
if (this.detailsFormGroup.valid) {
this.logger.debug(this, `Saving identity manager change`);
const overlayRef = this.busyService.show();
try {
await this.createPWO();
await this.data.selectedIdentity.GetEntity().Commit(true);
this.detailsFormGroup.markAsPristine();
this.snackbar.open({ key: '#LDS#The changes have been successfully saved.' });
this.closeSidesheet();
} finally {
this.busyService.hide(overlayRef);
}
}
}

private getDirtyValues(form: any) {
let dirtyValues = {};

Object.keys(form.controls)
.forEach(key => {
let currentControl = form.controls[key];

if (currentControl.dirty) {
if (currentControl.controls)
dirtyValues[key] = this.getDirtyValues(currentControl);
else
dirtyValues[key] = currentControl.value;
}
});

return dirtyValues;
}

public async createPWO():Promise<void>{

//const sdd = this.cartservice.getItemsForCart();

//this.itshopProvider.deleteShoppingCart();

var columnsToMonitor =this.personalColumns;

const changedCtrl = this.getDirtyValues(this.detailsFormGroup);
let str = '';

if (Object.keys(changedCtrl).length >0) {

columnsToMonitor.forEach( function(ctrlID ) {

Object.keys(changedCtrl).forEach(key => {
if (key === ctrlID) {

str = str+ ctrlID + '=' + changedCtrl[key] +'~';
}
});
});

for (let i=0;i<columnsToMonitor.length;i++){

this.detailsFormGroup.controls[columnsToMonitor[i]].setValue(this.map.get(columnsToMonitor[i]));

}

}
if (str.length>0) {

str = str.substring(0,str.length-1);
}
let displayorg1:string = await this.GetConfigParm("Custom\\Angular-Web\\ValidatePerson\\DisplayOrg");
let Uid_AccProduct1:string = await this.GetConfigParm("Custom\\Angular-Web\\ValidatePerson\\UID_Accproduct");
let Uid_ITShopOrg1:string = await this.GetConfigParm("Custom\\Angular-Web\\ValidatePerson\\UID_ITShopOrg");


const requestableProductForPerson: RequestableProductForPerson = {
UidPerson:this.data.selectedIdentity.GetEntity().GetKeys()[0],
UidITShopOrg:Uid_ITShopOrg1,
UidAccProduct: Uid_AccProduct1,
Display:displayorg1,
DisplayRecipient: this.personData.GetDisplay(),

};
const requestableServiceItemsFor: RequestableProductForPerson[]=[];
requestableServiceItemsFor.push(requestableProductForPerson);

this.cartservice.createCartandSubmit(requestableServiceItemsFor,str);
}

public async GetConfigParm(fullpath:string):Promise<string> {

let configs:PortalConfigparmGetconfigparmtest[] ;
const filter: FilterData[] = [
{
Type: FilterType.Compare,
CompareOp: CompareOperator.Equal,
ColumnName: 'FullPath',
Value1: fullpath
}];
configs= (await this.cccclientService.typedClient.PortalConfigparmGetconfigparmtest.Get({filter})).Data;
let configparm:string = "";
if (configs.length=== 1) {

configparm= configs[0].Value.value;
}

return configparm;

}

public async CreateandAssignShoppingcartOrder() : Promise<string> {

const cartOrderDetails = this.cccclientService.typedClient.PortalCartorderCreatenew.createEntity();
cartOrderDetails.UID_Person.value= this.data.selectedIdentity.GetEntity().GetKeys()[0];

let uidCartOrder: PortalCartorderCreatenew[];
uidCartOrder= (await this.cccclientService.typedClient.PortalCartorderCreatenew.Post(cartOrderDetails)).Data;
let uid:string = "";
if (uidCartOrder[0].EntityKeysData.Keys != null) {

uid = uidCartOrder[0].EntityKeysData.Keys[0];
}
return uid;

}

public async onIsSecurityIncidentToggleChanged(toggleChange: MatSlideToggleChange): Promise<void> {
const message = this.data.selectedIdentity.IsSecurityIncident.value
? '#LDS#Are you sure this identity does not pose a security risk anymore?'
: '#LDS#Are you sure this identity poses a security risk?';
const title = this.data.selectedIdentity.IsSecurityIncident.value
? '#LDS#Heading Resolve Security Risk'
: '#LDS#Heading Mark Identity as Security Risk';

const result = await this.confirmationService.confirm({
Title: title,
Message: message,
});

if (!result) {
this.isSecurityIncidentFormControl.setValue(!toggleChange.checked);
return;
}
this.data.selectedIdentity.IsSecurityIncident.value = !this.data.selectedIdentity.IsSecurityIncident.value;
}

public onIsActiveToggleChanged(toggleChange: MatSlideToggleChange): void {
// Invert the toggle value to match with the inverted state of the column 'IsInActive'
const value = !toggleChange?.checked;
if (this.data.selectedIdentity.IsInActive.GetMetadata().CanEdit()) {
this.data.selectedIdentity.IsInActive.value = value;
}
}

public async analyzeRisk(): Promise<void> {
this.sidesheet.open(RiskAnalysisSidesheetComponent, {
title: await this.translate.get('#LDS#Heading Analyze Risk').toPromise(),
subTitle: this.data.selectedIdentity.GetEntity().GetDisplay(),
padding: '0px',
width: '60%',
testId: 'identity-sidesheet-analyze-risk-sidesheet',
data: { objectKey: new DbObjectKey('Person', this.data.selectedIdentity.GetEntity().GetKeys()[0]).ToXmlString() },
});
}

public async generatePasscode(): Promise<void> {
let passcode;
let overlayRef: OverlayRef;
setTimeout(() => (overlayRef = this.busyService.show()));
try {
passcode = await this.passcodeService.getPasscodeWithPortalLogin(this.data.selectedIdentity.GetEntity().GetKeys()[0]);
} finally {
setTimeout(() => this.busyService.hide(overlayRef));
}
if (!passcode) {
return;
}
return this.passcodeService.showPasscode(
passcode,
this.data.selectedIdentity.GetEntity().GetDisplay(),
null,
await this.passcodeService.getValidationDuration()
);
}

public async onAssignManager(): Promise<void> {
this.busyService.show();

try {
const carts = await this.api.typedClient.PortalItshopCart.Get();
const param = this.api.typedClient.PortalPersonRequestmanagerchange.createEntity();
param.UID_PersonOrdered.value = this.data.selectedIdentity.GetEntity().GetKeys()[0];
if (carts.totalCount > 0) {
param.UID_ShoppingCartOrder.value = carts.Data[0].GetEntity().GetKeys()[0];
}

await this.api.typedClient.PortalPersonRequestmanagerchange.Post(this.data.selectedIdentity.GetEntity().GetKeys()[0], param);
} finally {
this.busyService.hide();
this.sidesheetRef.close();
this.snackbar.open({ key: '#LDS#The assignment of the manager has been successfully added to your shopping cart.' });
this.router.navigate(['shoppingcart']);
}
}

public update(cdr: ColumnDependentReference, list: ColumnDependentReference[]): void {
const index = list.findIndex((elem) => elem.column.ColumnName === cdr.column.ColumnName);
if (index === -1) {
return;
}

this.detailsFormGroup.removeControl(cdr.column.ColumnName);
list.splice(index, 1, new BaseCdr(cdr.column));
}

private closeSidesheet(): void {
this.sidesheetRef.close();
}

private async setup(): Promise<void> {
// Resolve an issue where the mat-tab navigation arrows could appear on first load
this.subscriptions.push(
this.sidesheetRef.componentInstance.onOpen().subscribe(() => {
// Recalculate header
this.tabs.updatePagination();
})
);


// TUKAJ DODAJ FORM FILE

// Handle the IsInActive column outside the context of a CDR editor so the UI can invert the meaning to make more sense to the user
// This should be inversed on the api data response at some point, but until then we handle it in the UI
this.isActiveFormControl.setValue(!this.data.selectedIdentity.IsInActive.value);
this.detailsFormGroup.addControl(this.data.selectedIdentity.IsInActive.Column.ColumnName, this.isActiveFormControl);


const customPersonalColumns = [
      'LastName',
      'FirstName',
      'MiddleName',
      'BirthDate',
      'PersonnelNumber',
      'Gender',
      'CentralAccount',
      'DefaultEmailAddress',
      'EntryDate',
      // 'IsPwdResetByHelpdeskAllowed'
    ];

    

    
   // const personalColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_Attributes;
    //const personalColumns = customPersonalColumns;
   //  this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList(this.data.selectedIdentity.GetEntity(), personalColumns, !this.data.canEdit);

  // MORE BIT THIS.PERSONAL DA JE OD NANE
  //   const personalColumns = customColumns;
    this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), this.personalColumns);



// const personalColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_Attributes;
// this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList(this.data.selectedIdentity.GetEntity(), personalColumns, !this.data.canEdit);

const organizationalColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_OrganizationalAttributes;

// tule daj preostale ko se morejo editirat na indentiteti


// moje tule v2

    const customColumns = [
      'Salutation',
      'DefaultEmailAddress',
      'EntryDate',
      'CentralAccount',
      'Title',
      'NameAddOn',
      'PhoneMobile',
      'CCC_ContractNumber',
      'CCC_365',
      'CCC_PhysicalAccess',
      'UID_ProfitCenter',
      'CCC_Capex',
      'CCC_DomainAccount',
      'CCC_Jira',
      'Remarks',
      'EmployeeType',
      'IsExternal',
    ];
    
    const readOnlyColumns = ['EmployeeType', 'CCC_DomainAccount'];

    const defaultValues = {
      'EmployeeType': 'Consultant', // Set your default value here,
      'IsExternal': true,
    };

    // nana defer columns
  //  this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), this.personalColumns, readOnlyColumns, defaultValues);
  this.cdrListPersonal = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), this.personalColumns);

  //  preostali columns
  this.cdrListOrganizational = this.cdrFactoryService.buildCdrFromColumnList2(this.data.selectedIdentity.GetEntity(), customColumns, readOnlyColumns, defaultValues);

// this.cdrListOrganizational = this.cdrFactoryService.buildCdrFromColumnList(
// this.data.selectedIdentity.GetEntity(), organizationalColumns, !this.data.canEdit );

// tole tudi zakomentiraj
// const localityColumns = this.data.projectConfig.PersonConfig.VI_Employee_MasterData_LocalityAttributes;
// this.cdrListLocality = this.cdrFactoryService.buildCdrFromColumnList(this.data.selectedIdentity.GetEntity(), localityColumns, !this.data.canEdit);

this.isSecurityIncidentFormControl.setValue(this.data.selectedIdentity.IsSecurityIncident.value);
this.detailsFormGroup.addControl(this.data.selectedIdentity.IsSecurityIncident.Column.ColumnName, this.isSecurityIncidentFormControl);

this.busyService.show();
try {
this.featureConfig = await this.featureConfigService.getFeatureConfig();
this.dynamicTabs = (
await this.extService.getFittingComponents<TabItem>('identitySidesheet', (ext) => ext.inputData.checkVisibility(this.parameters))
).sort((tab1: TabItem, tab2: TabItem) => tab1.sortOrder - tab2.sortOrder);
} finally {
this.busyService.hide();
}
}

}
