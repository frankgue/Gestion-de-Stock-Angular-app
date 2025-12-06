import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    public clientService: ClientService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.clientService.choixMenu == 'A') {
      this.infoForm();
    } else{

    }
  }

  infoForm() {
    this.clientService.dataForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.minLength(10)]],
      fax: ['', [Validators.required, Validators.minLength(8)]],
      login: ['', [Validators.required, Validators.minLength(8)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  resetForm() {
    this.clientService.dataForm.reset();
  }

  onSubmit() {
    this.submitted = true;
     if (this.clientService.choixMenu == 'A') {
      this.addData();
    } else{
         this.updateData();
    }
  }

  addData() {
    this.clientService
      .createData(this.clientService.dataForm.value)
      .subscribe((data) => {
        this.toastr.success("Validation faite avec success")
        this.resetForm();
      });
  }

  updateData() {
    this.clientService
      .updateData(
        this.clientService.dataForm.value.id,
        this.clientService.dataForm.value
      )
      .subscribe((data) => {
        this.toastr.success("Modification faite avec success")
        this.resetForm();
      });
  }
}
