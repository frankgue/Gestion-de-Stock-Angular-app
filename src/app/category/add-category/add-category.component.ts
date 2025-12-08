import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../service/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    public categoryService: CategoryService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    // @inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddCategoryComponent>
  ) {}

  ngOnInit(): void {
    if (this.categoryService.choixMenu == 'A') {
      this.infoForm();
    } else {
    }
  }

  infoForm() {
    this.categoryService.dataForm = this.formBuilder.group({
      id: [''],
      libelle: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  resetForm() {
    this.categoryService.dataForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryService.choixMenu == 'A') {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.categoryService
      .createData(this.categoryService.dataForm.value)
      .subscribe((data) => {
        this.dialogRef.close();
        this.categoryService.getAll().subscribe((response) => {
          this.categoryService.listData = response;
        });
        this.router.navigate(['/categories']);
      });
  }

  updateData() {
    this.categoryService
      .updateData(
        this.categoryService.dataForm.value.id,
        this.categoryService.dataForm.value
      )
      .subscribe((data) => {
        this.dialogRef.close();
        this.categoryService.getAll().subscribe((response) => {
          this.categoryService.listData = response;
        });
        this.router.navigate(['/categories']);
      });
  }
}
