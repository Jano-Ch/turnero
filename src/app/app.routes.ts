import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClinicaInfoComponent } from './pages/clinica-info/clinica-info.component';
import { CemInfoComponent } from './pages/cem-info/cem-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ShiftsComponent } from './pages/shifts/shifts.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent},
    {path: 'clinica', component: ClinicaInfoComponent},
    {path: 'cem', component: CemInfoComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'shifts', component: ShiftsComponent},
];
