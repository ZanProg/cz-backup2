/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2023 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EuiCoreModule, EuiMaterialModule } from '@elemental-ui/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  AppConfigService,
  BusyIndicatorModule,
  CdrModule,
  ClassloggerService,
  DataSourceToolbarModule,
  DataTableModule,
  DataTilesModule,
  DataTreeModule,
  FkAdvancedPickerModule,
  LdsReplaceModule,
  QbmModule,
  TileModule,
  RouteGuardService
} from 'qbm';

import { Routes, RouterModule } from '@angular/router';
import { PatternItemService } from './pattern-item-list/pattern-item.service';
import { PatternItemsModule } from './pattern-item-list/pattern-items.module';
import { QerService } from './qer.service';
import { ServiceItemsModule } from './service-items/service-items.module';
import { ServiceItemsService } from './service-items/service-items.service';
import { SettingsComponent } from './settings/settings.component';
import { ShoppingCartValidationDetailModule } from './shopping-cart-validation-detail/shopping-cart-validation-detail.module';
import { TilesModule } from './tiles/tiles.module';
import { UserModule } from './user/user.module';
import { BusinessOwnerChartSummaryComponent } from './wport/businessowner-chartsummary/businessowner-chartsummary.component';
import { StartComponent } from './wport/start/start.component';
import { FileUploadsComponent } from './file-upload/file-uploads/file-uploads.component';
import { CreateExternalComponent } from './identities/create-external/create-external.component'
import { CreateRobotComponent } from './identities/create-robot/create-robot.component'
import { ViewExternalComponent } from './identities/view-external/view-external.component';
import { ViewInternalComponent } from '../public_api';

export function initConfig(config: QerService): () => Promise<any> {
  return () =>
    new Promise<any>(async (resolve: any) => {
      if (config) {
        config.init();
      }
      resolve();
    });
}

const routes: Routes = [
  { 
    path: 'file-upload',
    component: FileUploadsComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
  { 
    path: 'create-external',
    component: CreateExternalComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
  { 
    path: 'create-robot',
    component: CreateRobotComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
  { 
    path: 'view-external',
    component: ViewExternalComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
  { 
    path: 'view-internal',
    component: ViewInternalComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  }
]


// @dynamic
@NgModule({
  declarations: [
    BusinessOwnerChartSummaryComponent, 
    StartComponent, 
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    QbmModule,
    CdrModule,
    TranslateModule,
    FormsModule,
    ServiceItemsModule,
    PatternItemsModule,
    ReactiveFormsModule,
    EuiCoreModule,
    EuiMaterialModule,
    TileModule,
    TilesModule,
    UserModule,
    LdsReplaceModule,
    BusyIndicatorModule,
    DataSourceToolbarModule,
    DataTableModule,
    DataTilesModule,
    DataTreeModule,
    ShoppingCartValidationDetailModule,
    FkAdvancedPickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [QerService],
      multi: true,
    },
    ServiceItemsService,
    PatternItemService,
  ],
  exports: [
    RouterModule,
  ],
})
export class QerModule {
  constructor(
    logger: ClassloggerService,
    private readonly config: AppConfigService,
    @Inject('environment') private readonly environment,
    @Inject('appConfigJson') private readonly appConfigJson
  ) {
    logger.info(this, '▶️ QerModule loaded');
  }
}
