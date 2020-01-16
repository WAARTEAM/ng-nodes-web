import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ChatpageComponent } from './components/chatpage/chatpage.component';


const routes: Routes = [
  { path: "", component: ChatpageComponent },
  { path: "Login", component: LoginComponent },
  { path: "register", component: SignupComponent },
  { path: "logout", component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
