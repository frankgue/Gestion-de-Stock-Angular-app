import { Component, OnInit } from '@angular/core';
import { Scategory } from '../../models/scategory';
import { FormBuilder, FormControl } from '@angular/forms';
import { ScategoryService } from '../../service/scategory.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddScategoryComponent } from '../add-scategory/add-scategory.component';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-list-scategory',
  standalone: false,
  templateUrl: './list-scategory.component.html',
  styleUrl: './list-scategory.component.css',
})
export class ListScategoryComponent implements OnInit {
  scategory!: Scategory;
  categoryList: Category[] = [];
  control: FormControl = new FormControl('');

  constructor(
    public scategoryService: ScategoryService,
    public categorieService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
    this.categorieService.getAll().subscribe((response) => {
      this.categoryList = response;
    });
  }

  getData() {
    this.scategoryService.getAll().subscribe((response) => {
      this.scategoryService.listData = response;
    });
  }

  addSCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';

    this.matDialog.open(AddScategoryComponent, dialogConfig);
  }

  removeData(id: number) {
    if (confirm('Are you sure you want to delete this Category ?')) {
      this.scategoryService.deleteData(id).subscribe(
        () => {
          this.toastr.success('Data successfully deleted!');
          this.getData();
        },
        (error) => console.log(error)
      );
    }
  }

  selectData(item: Scategory) {
    this.scategoryService.choixMenu = 'M';
    this.scategoryService.dataForm = this.fb.group(Object.assign({}, item));

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';

    this.matDialog.open(AddScategoryComponent, dialogConfig);
  }
}
