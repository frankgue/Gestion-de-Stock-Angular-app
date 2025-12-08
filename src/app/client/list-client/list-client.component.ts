import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Observable } from 'rxjs';
import { ClientService } from '../../service/client.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client',
  standalone: false,
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent implements OnInit {
  client!: Client;
  listData!: Observable<Client[]>;

  constructor(
    public clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.listData = this.clientService.getAll();
  }

  removeData(id: number) {
    if (confirm('Are you sure you want to delete this Client ?')) {
      this.clientService.deleteData(id).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success(' Data successfully deleted!');
          this.getData();
        },
        (error) => console.log(error)
      );
    }
  }

  selectData(item: Client) {
    this.clientService.choixMenu = 'M';
    this.clientService.dataForm = this.fb.group(Object.assign({}, item));
    this.router.navigate(['/clients']);
  }
}
