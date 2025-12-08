import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddScategoryComponent } from './scategory/add-scategory/add-scategory.component';
import { ListScategoryComponent } from './scategory/list-scategory/list-scategory.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';

const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full'},
  { path: 'clients', component: ListClientComponent},
  { path: 'client', component: AddClientComponent},
  { path: 'category', component: AddCategoryComponent},
  { path: 'categories', component: ListCategoryComponent},
  { path: 'scategory', component: AddScategoryComponent},
  { path: 'scategories', component: ListScategoryComponent},
  { path: 'article', component: AddArticleComponent},
  { path: 'articles', component: ListArticleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
