import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: ResultComponent },
  { path: 'queries', component: QueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
