import { Component, OnInit } from '@angular/core';
import { CreateNewIdentity2Component } from '../create-new-identity2/create-new-identity2.component'
import { EuiLoadingService, EuiSidesheetService } from '@elemental-ui/core';
import { ProjectConfigurationService } from '../../project-configuration/project-configuration.service';
// import { IdentitySidesheetComponent } from '../identity-sidesheet/identity-sidesheet.component'
import { ProjectConfig } from 'imx-api-qer';
import { IdentitiesService } from '../identities.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ccc-create-external',
  templateUrl: './create-external.component.html',
  styleUrls: ['./create-external.component.scss']
})
export class CreateExternalComponent implements OnInit {


  private projectConfig: ProjectConfig;

  constructor(
    private readonly sideSheet: EuiSidesheetService,
    private readonly translate: TranslateService,
    private readonly identitiesService: IdentitiesService,
    private readonly configService: ProjectConfigurationService,

  ) { }

  async ngOnInit(): Promise<void> {
      await this.init();
  }

  private async init(): Promise<void> {
    this.projectConfig = await this.configService.getConfig();
    this.openForm();
  }

  async openForm(): Promise<void> {
    await this.sideSheet
    .open(CreateNewIdentity2Component, {
      title: await this.translate.get('#LDS#Create External').toPromise(),
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

  // return this.navigate(); 
  }
}
