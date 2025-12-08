import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../service/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-list-category',
  standalone: false,
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  category!: Category;
  control: FormControl = new FormControl('');

  constructor(
    public categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryService.getAll().subscribe(response => {
      this.categoryService.listData = response;
    });
  }

  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';

    this.matDialog.open(AddCategoryComponent, dialogConfig);
  }

  removeData(id: number) {
    if (confirm('Are you sure you want to delete this Category ?')) {
      this.categoryService.deleteData(id).subscribe(
        () => {
          this.toastr.success('Data successfully deleted!');
          this.getData();
        },
        (error) => console.log(error)
      );
    }
  }

  selectData(item: Category) {
    this.categoryService.choixMenu = 'M';
    this.categoryService.dataForm = this.fb.group(Object.assign({}, item));

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';

    this.matDialog.open(AddCategoryComponent, dialogConfig);
  }
}
