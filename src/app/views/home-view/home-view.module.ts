import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountModule } from 'src/app/shared/components';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
  },
];

const Components: any[] = [AccountModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ...Components,
  ],
  declarations: [HomeViewComponent],
  exports: [HomeViewComponent],
})
export class HomeViewModule {}
