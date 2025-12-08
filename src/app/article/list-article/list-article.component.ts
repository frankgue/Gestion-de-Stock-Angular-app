import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../service/article.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddArticleComponent } from '../add-article/add-article.component';

@Component({
  selector: 'app-list-article',
  standalone: false,
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.css',
})
export class ListArticleComponent implements OnInit {
  client!: Article;
  listData!: Observable<Article[]>;

  constructor(
    public articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.listData = this.articleService.getAll();
  }

  removeData(id: number) {
    if (confirm('Are you sure you want to delete this Article ?')) {
      this.articleService.deleteData(id).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success(' Data successfully deleted!');
          this.getData();
        },
        (error) => console.log(error)
      );
    }
  }

  
  addArticle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
  dialogConfig.maxHeight = '80vh';

    this.matDialog.open(AddArticleComponent, dialogConfig);
  }

  selectData(item: Article) {
    this.articleService.choixMenu = 'M';
    this.articleService.dataForm = this.fb.group(Object.assign({}, item));
    this.router.navigate(['/clients']);
  }
}
