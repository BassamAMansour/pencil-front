import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {AuthService} from "./shared/services/auth.service";
import {CanvasComponent} from './components/canvas/canvas.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
