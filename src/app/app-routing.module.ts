import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from './components/profile/profile.component';
import { ChatpageComponent } from './components/chatpage/chatpage.component';
import {AuthGuard} from './guards/auth.guard'
import {NotAuthGuard} from './guards/notauth.guard'
import { SearchAreaComponent } from './components/search-area/search-area.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: "", component: LandingComponent,canActivate:[NotAuthGuard]},
  { path: "login", component: LoginComponent ,canActivate:[NotAuthGuard]},
  { path: "profile", component: ProfileComponent, canActivate:[AuthGuard]},
  { path: "info", component: SettingsComponent, canActivate:[AuthGuard]},
  { path: "users/:username", component: ProfileComponent, canActivate:[AuthGuard]},
  { path: "register", component: SignupComponent,canActivate:[NotAuthGuard]},
  { path: "chatroom" ,component: ChatpageComponent , canActivate:[AuthGuard]},
  { path: "search" ,component: SearchAreaComponent , canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
