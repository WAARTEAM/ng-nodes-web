import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from './components/profile/profile.component';
import { ChatpageComponent } from './components/chatpage/chatpage.component';
import {AuthGuard} from './guards/auth.guard'

const routes: Routes = [
  { path: "", component: LandingComponent },

  { path: "Login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, data: {profile : true} },
  { path: "users/:username", component: ProfileComponent, data: {profile : false} },
  { path: "register", component: SignupComponent },

  { path: "chatroom" ,component: ChatpageComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
