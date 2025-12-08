import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Scategory } from '../../models/scategory';
import { Category } from '../../models/category';
import { ScategoryService } from '../../service/scategory.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-article',
  standalone: false,
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent  implements OnInit {
  submitted: boolean = false;
  scategoryList: Scategory[] = []
  categoryList: Category[] = []
  tvaList: any[] = [15,14,24 ,9, 2, 3]

  constructor(
    public articleService: ArticleService,
        public scategoryService: ScategoryService,
        public categorieService: CategoryService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    // @inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>
  ) {}

  ngOnInit(): void {
    if (this.articleService.choixMenu == 'A') {
      this.infoForm();
      this.categorieService.getAll().subscribe(response => {
        this.categoryList = response
      })
      this.scategoryService.getAll().subscribe(response => {
        this.scategoryList = response
      })
    } else {
    }
  }

  infoForm() {
    this.articleService.dataForm = this.formBuilder.group({
      id: [''],
      libelle: ['', [Validators.required]],
      code: ['', [Validators.required]],
      pa: ['', [Validators.required]],
      tva: ['', [Validators.required]],
      fodec: ['', [Validators.required]],
      pv: ['', [Validators.required]],
      stockInit: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      codeCateg: ['', [Validators.required]],
      codeSCateg: ['', [Validators.required]],
    });
  }

  resetForm() {
    this.articleService.dataForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.articleService.choixMenu == 'A') {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.articleService
      .createData(this.articleService.dataForm.value)
      .subscribe((data) => {
        this.dialogRef.close();
        this.articleService.getAll().subscribe((response) => {
          this.articleService.listData = response;
        });
        this.router.navigate(['/articles']);
      });
  }

  updateData() {
    this.articleService
      .updateData(
        this.articleService.dataForm.value.id,
        this.articleService.dataForm.value
      )
      .subscribe((data) => {
        this.dialogRef.close();
        this.articleService.getAll().subscribe((response) => {
          this.articleService.listData = response;
        });
        this.router.navigate(['/articles']);
      });
  }
}
