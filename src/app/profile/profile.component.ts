import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../components/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public editForm !: FormGroup
  show_button: Boolean = false;
  show_eye: Boolean = false;
  cancelShow !: boolean
  noChange !: boolean
  loading = false
  signUser: any = []
  spin !: boolean
  changes !: boolean
  
  constructor(private formBuilder : FormBuilder, private toastr: ToastrService, private api: AuthService, private spinner: NgxSpinnerService ){}
  
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [""],
      fullName: ["", [Validators.required]],
      mobile: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
    })
    
    var user = JSON.parse(localStorage.getItem("user") || '{}')
    console.log(user);
    this.signUser.push(user)
  }
  
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  } 
  
  onEdit(item: any) {
    item.isEdit = true
    this.cancelShow = true
    this.changes = true    
  }
  
  saveChanges() {
    
    let data = {
      id: JSON.parse(localStorage.getItem("user") || '{}').id,
      fullName: this.editForm.value.fullName,
      password: this.editForm.value.password,
      mobile: this.editForm.value.mobile
    }
    console.log(data);
    
    this.loading = true
    
    this.api.updateDetails(data) 
    .subscribe(res => {
      this.spin = true
      this.toastr.success('User successfully updeted');
      this.loading = false
      this.noChange = false
      this.changes = false
    })
    localStorage.setItem('user', JSON.stringify(data))
  }
  
  cancelEdit(item: any) {
    item.isEdit = false
    this.noChange = false
    this.changes = false
    console.log(item);
    
  }
}
