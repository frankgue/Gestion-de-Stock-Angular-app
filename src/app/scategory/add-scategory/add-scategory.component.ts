import { Component, OnInit } from '@angular/core';
import { ScategoryService } from '../../service/scategory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-scategory',
  standalone: false,
  templateUrl: './add-scategory.component.html',
  styleUrl: './add-scategory.component.css'
})
export class AddScategoryComponent  implements OnInit {
  submitted: boolean = false;
  categoryList: Category[] = []
  constructor(
    public scategoryService: ScategoryService,
    public categorieService: CategoryService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    // @inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddScategoryComponent>
  ) {}

  ngOnInit(): void {
    if (this.scategoryService.choixMenu == 'A') {
      this.infoForm();
      this.categorieService.getAll().subscribe(response => {
        this.categoryList = response
      })
    } else {
    }
  }

  infoForm() {
    this.scategoryService.dataForm = this.formBuilder.group({
      id: [''],
      libelle: ['', [Validators.required]],
      codeCateg: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  resetForm() {
    this.scategoryService.dataForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.scategoryService.choixMenu == 'A') {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.scategoryService
      .createData(this.scategoryService.dataForm.value)
      .subscribe((data) => {
        this.dialogRef.close();
        this.scategoryService.getAll().subscribe((response) => {
          this.scategoryService.listData = response;
        });
        this.router.navigate(['/scategories']);
      });
  }

  updateData() {
    this.scategoryService
      .updateData(
        this.scategoryService.dataForm.value.id,
        this.scategoryService.dataForm.value
      )
      .subscribe((data) => {
        this.dialogRef.close();
        this.scategoryService.getAll().subscribe((response) => {
          this.scategoryService.listData = response;
        });
        this.router.navigate(['/scategories']);
      });
  }
}
