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
import { ProfileComponent } from './components/profile/profile.component';
import { ChatpageComponent } from './components/chatpage/chatpage.component';
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from './guards/auth.guard'; 

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ChatpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [ValidateService, AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
