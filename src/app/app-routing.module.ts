import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {CanvasComponent} from "./components/canvas/canvas.component";

export enum Paths {
  ROOT = '',
  SIGN_IN = 'sign-in',
  REGISTER = 'register-user',
  DASHBOARD = 'dashboard',
  FORGOT_PASSWORD = 'forgot-password',
  VERIFY_EMAIL = 'verify-email-address',
  CANVAS = 'canvas'
}


export const routes: Routes = [
  {path: Paths.ROOT, redirectTo: Paths.CANVAS, pathMatch: 'full'},
  {path: Paths.SIGN_IN, component: SignInComponent},
  {path: Paths.REGISTER, component: SignUpComponent},
  {path: Paths.FORGOT_PASSWORD, component: ForgotPasswordComponent},
  {path: Paths.VERIFY_EMAIL, component: VerifyEmailComponent},
  {path: Paths.CANVAS, component: CanvasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
