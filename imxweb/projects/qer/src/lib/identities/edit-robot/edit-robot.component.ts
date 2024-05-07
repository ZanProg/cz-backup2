import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EuiSidesheetService, EuiLoadingService } from '@elemental-ui/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectConfig } from 'imx-api-qbm';
import { PortalPersonAll, PortalPersonReports, PortalAdminPerson, ViewConfigData } from 'imx-api-qer';
import { CollectionLoadParameters, EntitySchema, DisplayColumns, DataModelProperty, IClientProperty, DataModel, CompareOperator } from 'imx-qbm-dbts';
import { HelpContextualValues, DataSourceToolbarSettings, DataSourceToolbarFilter, DataTableGroupedData, IExtension, BusyService, DataSourceToolbarGroupData, DataSourceToolbarViewConfig, ImxTranslationProviderService, ClassloggerService, AuthenticationService, SettingsService, ExtService, MessageDialogComponent, DataSourceToolbarExportMethod, SideNavigationComponent } from 'qbm';
import { Subscription } from 'rxjs';
import { QerPermissionsService } from '../../admin/qer-permissions.service';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
import { ViewConfigService } from '../../view-config/view-config.service';
import { CreateNewIdentityComponent } from '../create-new-identity/create-new-identity.component';
import { CreateNewIdentity2Component } from '../create-new-identity2/create-new-identity2.component';
import { CustomIdentitySidesheetComponent } from '../custom-identity-sidesheet/custom-identity-sidesheet.component';
import { IdentitiesReportsService } from '../identities-reports.service';
import { IdentitiesService } from '../identities.service';
import { CreateNewIdentity3Component } from '../create-new-identity3/create-new-identity3.component';
import { CustomRobotSidesheetComponent } from '../custom-robot-sidesheet/custom-robot-sidesheet.component';
import { IdentitySidesheetComponent } from '../identity-sidesheet/identity-sidesheet.component';

@Component({
  selector: 'ccc-edit-robot',
  templateUrl: './edit-robot.component.html',
  styleUrls: ['./edit-robot.component.scss']
})
export class EditRobotComponent implements OnInit, OnDestroy, SideNavigationComponent {


  @Input() public applyIssuesFilter = false;

  /**
   * If set to false the css class for the fullscreen view will be deactivated
   */
  @Input() public showFullscreen = true;

  /**
   * Sets the admin mode to show all identities
   */
  @Input() public isAdmin = false;
  @Input() public contextId: HelpContextualValues;

  /**
   * Settings needed by the DataSourceToolbarComponent
   */
  public dstSettings: DataSourceToolbarSettings;

  /**
   * Page size, start index, search and filtering options etc.
   */
  public navigationState: CollectionLoadParameters;

  /**
   * Selected person
   */
  public selectedPerson: PortalPersonAll | PortalPersonReports;

  /**
   * Details of selected person
   */
  public selectedPersonDetail: PortalAdminPerson | PortalPersonReports;

  public currentUser: string;

  public entitySchemaPersonReports: EntitySchema;
  public readonly DisplayColumns = DisplayColumns;
  public filterOptions: DataSourceToolbarFilter[] = [];
  public groupingOptions: DataModelProperty[] = [];
  public data: any;

  public groupData: { [key: string]: DataTableGroupedData } = {};
  public isManagerForPersons: boolean;
  public isPersonAdmin: boolean;
  public isAuditor: boolean;
  public extensions: IExtension[] = [];

  private projectConfig: ProjectConfig;
  private displayedColumns: IClientProperty[] = [];
  private authorityDataDeleted$: Subscription;
  private sessionResponse$: Subscription;

  public busyService = new BusyService();
  private displayedInnerColumns: IClientProperty[] = [];
  private groupingInfo: DataSourceToolbarGroupData;
  private dataModel: DataModel;
  private viewConfig: DataSourceToolbarViewConfig;
  private get viewConfigPath(): string {
    return this.isAdmin ? 'admin/person' : 'person/reports';
  }
  // private get viewConfigPath(): string {
  //   return this.isAdmin ? 'person/reports' : 'admin/person';
  // }
  @ViewChild('dynamicReport', { static: true, read: ViewContainerRef }) dynamicReport: ViewContainerRef;

  constructor(
    public translateProvider: ImxTranslationProviderService,
    private readonly sideSheet: EuiSidesheetService,
    private readonly busyServiceElemental: EuiLoadingService,
    private readonly logger: ClassloggerService,
    private readonly configService: ProjectConfigurationService,
    private readonly dialog: MatDialog,
    private readonly identitiesService: IdentitiesService,
    private viewConfigService: ViewConfigService,
    private readonly translate: TranslateService,
    private readonly authService: AuthenticationService,
    qerPermissionService: QerPermissionsService,
    private identityReports: IdentitiesReportsService,
    settingsService: SettingsService,
    private extService: ExtService
  ) {
    // Tule spremenis filter
   // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [{
     // ColumnName: 'EmployeeType',
      //CompareOp: CompareOperator.Equal,
      //Values: ['Other'],
    //}]};

   // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [{
     // ColumnName: 'IsExternal',
      //CompareOp: CompareOperator.Equal,
      //Value1: true
    //}]};

    // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0}
    this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [{
      ColumnName: 'EmployeeType',
      CompareOp: CompareOperator.Equal,
      Value1: 'Other'
    }]};
    // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [
    //   {Type:2,
    //   Expression:{Expressions:
    //     [{
    //       PropertyId:"EmployeeType",
    //       Operator:"=",
    //       LogOperator:0,
    //       Value:"Other"
    //     }],
    //       LogOperator:0}
    //     }]}

    // this.getDynamicMenuItems();
    // this.init();
    // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [
    //   {Type:2,
    //     Expression:{
    //       Expressions:[{
    //         PropertyId:"EmployeeType",
    //         Operator:"=",
    //         LogOperator:0,
    //         Value:"Other"
    //       }],
    //       LogOperator:0}}
    // ]}



       

   
	//[{"ColumnName":"IsExternal","CompareOp":0,"Value1":true}]

    // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0, filter: [{
    //   ColumnName: 'EmployeeType',
    //   CompareOp: CompareOperator.Equal,
    //   Value1: true
    // }]};
    // this.navigationState = { PageSize: settingsService.DefaultPageSize, StartIndex: 0};
    this.authorityDataDeleted$ = this.identitiesService.authorityDataDeleted.subscribe(() => this.navigate());

    this.sessionResponse$ = this.authService.onSessionResponse.subscribe(async (session) => {
      if (session.IsLoggedIn) {
        (this.currentUser = session.UserUid), (this.isManagerForPersons = await qerPermissionService.isPersonManager());
        this.isPersonAdmin = await qerPermissionService.isPersonAdmin();
        this.isAuditor = await qerPermissionService.isAuditor();
      }
    });

    // this.navigate()
  }

  get isMobile(): boolean {
    return document.body.offsetWidth <= 768;
  }

  public async ngOnInit(): Promise<void> {
    // console.dir(this.navigationState)
    // let externalReports;

    // fetch(`https://${window.location.hostname}/ApiServer/portal/person/reports`, 
    //   {
		// 		method: 'GET',
		// 	}).then(response => {
		// 			if (!response.ok) {
		// 				throw new Error('Network response was not ok (GET ping)');
		// 			}
		// 			return response.json();
		// 		}).then(data => {
    //         console.log(data);
            
    //         const externalReports = data.Entities.filter(entity => entity.Columns.IsExternal.Value == true);
    //         console.log(externalReports);
		// 	  })
    // console.log(`External reports object: ${externalReports}`);
    

    this.getDynamicMenuItems();
    await this.init();

    
  }

  public ngOnDestroy(): void {
    if (this.authorityDataDeleted$) {
      this.authorityDataDeleted$.unsubscribe();
    }

    if (this.sessionResponse$) {
      this.sessionResponse$.unsubscribe();
    }
  }

  public getDynamicMenuItems(): void {
    if (this.isAdmin) {
      this.extensions = this.extService.Registry['identityReports'];
    } else {
      this.extensions = this.extService.Registry['identityReportsManager'];
    }
  }

  // !!TODO - Fix mat menu dynamic report components
  // Create dynamic report components and call viewReport function
  public async showDynamicReport(extension: IExtension): Promise<void> {
    const dynamicReportComponent = this.dynamicReport.createComponent(extension.instance, { index: 0 });
    dynamicReportComponent.instance.referrer = this.currentUser;
    dynamicReportComponent.instance.inputData = extension.inputData;
    await dynamicReportComponent.instance.ngOnInit();
    if (dynamicReportComponent.instance.viewReport) {
      dynamicReportComponent.instance.viewReport();
    }
  }

  /**
   * Occurs when the navigation state has changed - e.g. users clicks on the next page button.
   *
   */
  public async onNavigationStateChanged(newState: CollectionLoadParameters): Promise<void> {
    this.navigationState = newState;
    await this.navigate();
  }

  public async personsManagedReport(): Promise<void> {
    this.identityReports.personsManagedReport(this.currentUser, '#LDS#Download report on identities you are directly responsible for');
  }

  /**
   * Occurs when user selects an identity.
   *
   * @param identity Selected identity.
   */
  public async onIdentityChanged(identity: PortalPersonAll | PortalPersonReports): Promise<void> {
    const overlayRef = this.busyServiceElemental.show();

    try {
      this.logger.debug(this, `Selected identity changed`);
      this.logger.trace('New selected identity', identity);
      this.selectedPerson = identity;
      this.selectedPersonDetail = await this.getPersonDetails(this.selectedPerson.GetEntity().GetKeys()[0]);

      if (!this.selectedPersonDetail) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: {
            ShowOk: true,
            Title: await this.translate.get('#LDS#Heading Load Object').toPromise(),
            Message: await this.translate
              .get('#LDS#The object cannot be loaded. The displayed data may differ from the actual state. The data will now be reloaded.')
              .toPromise(),
          },
          panelClass: 'imx-messageDialog',
        });

        await dialogRef.afterClosed().toPromise();
        // reload data
        return this.navigate();
      }
      await this.viewIdentity(this.selectedPersonDetail);
    } finally {
      this.busyServiceElemental.hide(overlayRef);
    }
  }

  /**
   * Occurs when user triggers search.
   *
   * @param keywords Search keywords.
   */
  public async onSearch(keywords: string): Promise<void> {
    this.logger.debug(this, `Searching for: ${keywords}`);
    this.navigationState.StartIndex = 0;
    this.navigationState.search = keywords;
    await this.navigate();
  }

  public async onGroupingChange(groupKey: string): Promise<void> {
    const isBusy = this.busyService.beginBusy();

    try {
      const groupData = this.groupData[groupKey];
      groupData.data = this.isAdmin
        ? await this.identitiesService.getAllPersonAdmin(groupData.navigationState)
        : await this.identitiesService.getReportsOfManager(groupData.navigationState);
      groupData.settings = {
        displayedColumns: this.displayedInnerColumns,
        dataSource: groupData.data,
        entitySchema: this.entitySchemaPersonReports,
        navigationState: groupData.navigationState,
        dataModel: this.dataModel,
      };
    } finally {
      isBusy.endBusy();
    }
  }

  public async createNewIdentity(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentityComponent, {
        title: await this.translate.get('#LDS#Heading Create Identity').toPromise(),
        padding: '0px',
        width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }

  // ustvarimo novega robota
  public async createNewRobot(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentity3Component, {
        title: await this.translate.get('#LDS# Create Robot Identity').toPromise(),
        padding: '0px',
        width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }

  public async createNewExternalIdentity(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentity2Component, {
        title: await this.translate.get('#LDS#Heading Create Identity').toPromise(),
        padding: '0px',
        width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }

  public async createNewIdentity2(): Promise<void> {
    await this.sideSheet
      .open(CreateNewIdentity2Component, {
        title: await this.translate.get('#LDS#Create Identity 2').toPromise(),
        padding: '0px',
        width: 'max(650px, 65%)',
        disableClose: true,
        testId: 'create-new-identity-sidesheet',
        icon: 'contactinfo',
        data: {
          selectedIdentity: await this.identitiesService.createEmptyEntity(),
          projectConfig: this.projectConfig,
        },
      })
      .afterClosed()
      .toPromise();

    return this.navigate();
  }


  // init v2
  private async init(): Promise<void> {
    const isBusy = this.busyService.beginBusy();

    this.entitySchemaPersonReports = this.identitiesService.personReportsSchema;
    try {
      this.projectConfig = await this.configService.getConfig();
      this.displayedColumns = [
        this.entitySchemaPersonReports.Columns[DisplayColumns.DISPLAY_PROPERTYNAME],
        this.entitySchemaPersonReports.Columns.IsSecurityIncident,
        this.entitySchemaPersonReports.Columns.UID_Department,
      ];

      if (!this.isAdmin) {
        this.displayedColumns.push(
          this.entitySchemaPersonReports.Columns.IdentityType,
          this.entitySchemaPersonReports.Columns.EmployeeType,
          this.entitySchemaPersonReports.Columns.IsExternal
        );
      }

      // Ensure this column is always added last
      this.displayedColumns.push(this.entitySchemaPersonReports.Columns.XMarkedForDeletion);

      this.displayedInnerColumns = [this.entitySchemaPersonReports.Columns[DisplayColumns.DISPLAY_PROPERTYNAME]];

      this.dataModel = !this.isAdmin ? await this.identitiesService.getDataModelAdmin() : await this.identitiesService.getDataModelReport();
      //this.dataModel = !this.isAdmin ? await this.identitiesService.getDataModelAdmin() : await this.identitiesService.getDataModelReport();

    
      this.filterOptions = this.dataModel.Filters;
      this.groupingOptions = this.getGroupableProperties(this.dataModel.Properties);

      if (!this.isAdmin) {
        // const indexActive = this.filterOptions.findIndex((elem) => elem.Name === 'isinactive');
        // if (indexActive > -1) {
        //   this.filterOptions[indexActive].InitialValue = '0';
        // }
        const reports = this.filterOptions.findIndex((elem) => elem.Name === 'reports');
        if (reports > -1) {
          this.filterOptions[reports].InitialValue = '0';
        }
      }

      if (this.applyIssuesFilter) {
        const indexWithManagerFilter = this.filterOptions.findIndex((elem) => elem.Name === 'withmanager');
        if (indexWithManagerFilter > -1) {
          this.filterOptions[indexWithManagerFilter].InitialValue = '0';
        }
      }
      this.viewConfig = await this.viewConfigService.getInitialDSTExtension(this.dataModel, this.viewConfigPath);
      await this.navigate();
    } finally {
      isBusy.endBusy();
    }
  }


  private async navigate(): Promise<void> {
    const isBusy = this.busyService.beginBusy();
    try {
      this.logger.debug(this, `Retrieving person list`);
      this.logger.trace('Navigation settings', this.navigationState);
      if (!this.groupingInfo && this.groupingOptions.length > 0) {
        this.groupingInfo = {
          groups: [
            {
              property: this.groupingOptions[0],
              getData: async () => {
                return this.identitiesService.getGroupedAllPerson('IdentityType', {
                  PageSize: this.navigationState.PageSize,
                  StartIndex: 0,
                  withProperties: this.navigationState.withProperties,
                });
              },
            },
          ],
        };
      }

      // here we need !this.admin since the person viewing the data is not an admin in this case
      this.entitySchemaPersonReports = this.identitiesService.personReportsSchema;
      const data = !this.isAdmin
        ? await this.identitiesService.getAllPersonAdmin(this.navigationState)
        : await this.identitiesService.getReportsOfManager(this.navigationState);
      const exportMethod: DataSourceToolbarExportMethod = this.isAdmin
        ? this.identitiesService.exportAdminPerson(this.navigationState)
        : this.identitiesService.exportPerson(this.navigationState);
      exportMethod.initialColumns = this.displayedColumns.map((col) => col.ColumnName);

      this.dstSettings = {
        displayedColumns: this.displayedColumns,
        dataSource: data,
        entitySchema: this.entitySchemaPersonReports,
        navigationState: this.navigationState,
        filters: this.filterOptions,
        groupData: this.groupingInfo,
        dataModel: this.dataModel,
        viewConfig: this.viewConfig,
        exportMethod,
      };
      this.logger.debug(this, `Head at ${data.Data.length + this.navigationState.StartIndex} of ${data.totalCount} item(s)`);
    } finally {
      isBusy.endBusy();
    }
  }

  public async updateConfig(config: ViewConfigData): Promise<void> {
    await this.viewConfigService.putViewConfig(config);
    this.viewConfig = await this.viewConfigService.getDSTExtensionChanges(this.viewConfigPath);
    this.dstSettings.viewConfig = this.viewConfig;
  }

  public async deleteConfigById(id: string): Promise<void> {
    await this.viewConfigService.deleteViewConfig(id);
    this.viewConfig = await this.viewConfigService.getDSTExtensionChanges(this.viewConfigPath);
    this.dstSettings.viewConfig = this.viewConfig;
  }

  // tukaj spremenimo dovolenje da drug manager spremeni informacije drugih podrejeneih
  private async getPersonDetails(id: string): Promise<PortalAdminPerson | PortalPersonReports> {
    if (id == null || id.length <= 0) {
      return null;
    }
    this.logger.debug(this, `Retrieving details for admin person with id ${id}`);

    return !this.isAdmin ? this.identitiesService.getAdminPerson(id) : (await this.identitiesService.getPersonInteractive(id)).Data[0];
  }

  //TULE POGLEDAMO NA ENDITITETO
  private async viewIdentity(identity: PortalAdminPerson | PortalPersonReports): Promise<void> {
    await this.sideSheet
      .open(CustomRobotSidesheetComponent, {
        title: await this.translate.get('#LDS# Edit Robot Identity').toPromise(),
        subTitle: identity.GetEntity().GetDisplay(),
        padding: '0px',
        disableClose: true,
        width: 'max(768px, 70%)',
        icon: 'contactinfo',
        data: {
          isAdmin: this.isAdmin,
          projectConfig: this.projectConfig,
          selectedIdentity: identity,
          canEdit: true,
        },
        testId: 'identities-view-identity-sidesheet',
      })
      .afterClosed()
      .toPromise();
      
    return this.navigate();
  }

  private getGroupableProperties(identityProperties: DataModelProperty[]): DataModelProperty[] {
    let groupable: DataModelProperty[] = [];
    groupable = identityProperties.filter((item) => item.IsGroupable);
    return groupable;
  }

}
