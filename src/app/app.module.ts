import { BrowserModule } from "@angular/platform-browser";

import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./components/landing/landing.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { FlashMessagesModule } from "angular2-flash-messages";

import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { HttpClientModule } from "@angular/common/http";
import { ClientHomeComponent } from "./components/client-home/client-home.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
