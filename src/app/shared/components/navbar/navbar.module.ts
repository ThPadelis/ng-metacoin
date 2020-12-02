import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { NGXBootstrapModule } from '../ngx-bootstrap.module';
@NgModule({
  imports: [CommonModule, RouterModule, NGXBootstrapModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
