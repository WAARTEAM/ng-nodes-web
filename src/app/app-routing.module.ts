import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ClientHomeComponent } from "./components/client-home/client-home.component";
const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    children: [
      { path: "", component: ClientHomeComponent },
      { path: "Login", component: LoginComponent },

      { path: "register", component: SignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
