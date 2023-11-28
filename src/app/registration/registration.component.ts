import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrForm !: FormGroup
  registrArray: any = {}

  show_button: Boolean = false;
  show_eye: Boolean = false;

  constructor(private formBuilder : FormBuilder, private api: AuthService, private router: Router, private toastr: ToastrService) {}

  
  ngOnInit(): void {
    this.registrForm = this.formBuilder.group({
      fullName : this.formBuilder.control('', Validators.required),
      mobile : this.formBuilder.control('', [Validators.required]),
      password : this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    })       
  }

  registr() {
    this.api.registr(this.registrArray)
    .subscribe( res => {
      console.log(res);
      
        this.registrForm.reset()
        this.toastr.success('Successfully registered');  
        this.router.navigate(["/login"])

    },err => {
      alert("something went wrong")
      this.toastr.error('User not found')
    }
    )
  }

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }  

  get firstName(){ 
    return this.registrForm.get('fullName')
  }
}
