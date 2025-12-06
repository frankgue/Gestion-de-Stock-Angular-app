import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListScategoryComponent } from './scategory/list-scategory/list-scategory.component';
import { AddScategoryComponent } from './scategory/add-scategory/add-scategory.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ListClientComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    ListScategoryComponent,
    AddScategoryComponent,
    ListArticleComponent,
    AddArticleComponent,
    AddFournisseurComponent,
    ListFournisseurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient(), provideAnimations(), provideToastr()],
  bootstrap: [AppComponent],
})
export class AppModule {}
