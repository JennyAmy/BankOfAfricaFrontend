import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TabViewModule} from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenAccountComponent } from './components/customer/open-account/open-account.component';
import { HomeComponent } from './components/general/home/home.component';
import { NavBarComponent } from './components/general/nav-bar/nav-bar.component';
import { TransferHistoryComponent } from './components/transaction/transfer-history/transfer-history.component';
import { TransferMoneyComponent } from './components/transaction/transfer-money/transfer-money.component';
import { AccountOfficerComponent } from './components/user/account-officer/account-officer.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { LayoutComponent } from './components/user/layout/layout.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { ComplaintsComponent } from './components/general/home/complaints/complaints.component';

import { AlertifyService } from './services/alertify.service';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { DatePipe } from '@angular/common';
import { BuyAirtimeComponent } from './components/transaction/buy-airtime/buy-airtime.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    OpenAccountComponent,
    LayoutComponent,
    TransferMoneyComponent,
    AccountOfficerComponent,
    DashboardComponent,
    TransferHistoryComponent,
    UserDetailsComponent,
    ComplaintsComponent,
    BuyAirtimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // NgxGalleryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    DatePipe,
    AlertifyService,
    TabViewModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
