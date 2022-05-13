import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenAccountComponent } from './components/customer/open-account/open-account.component';
import { HomeComponent } from './components/general/home/home.component';
import { BuyAirtimeComponent } from './components/transaction/buy-airtime/buy-airtime.component';
import { TransferHistoryComponent } from './components/transaction/transfer-history/transfer-history.component';
import { TransferMoneyComponent } from './components/transaction/transfer-money/transfer-money.component';
import { AccountOfficerComponent } from './components/user/account-officer/account-officer.component';
import { LayoutComponent } from './components/user/layout/layout.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

const routes: Routes = [
  {path: 'open-account', component: OpenAccountComponent},

  {path: 'sign-up', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},


  {path: '', component: HomeComponent,
},
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'transfer', component: TransferMoneyComponent},
      {path: 'buy', component: BuyAirtimeComponent},
      {path: 'transaction-history', component: TransferHistoryComponent},
      {path: 'account-officer', component: AccountOfficerComponent},
      {path: 'details', component: UserDetailsComponent}
    ]
  },

  { path: '**', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
