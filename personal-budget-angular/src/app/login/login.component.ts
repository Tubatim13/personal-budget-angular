import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'pb-login',
  standalone: true,
  imports: [BreadcrumbsComponent], // ✅ Import BreadcrumbsComponent
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { }
