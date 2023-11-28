import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../components/auth/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  public editForm !: FormGroup
  datas!: any
  signUser: any = []
  showAdd !: boolean
  showUpdate !: boolean
  loading: boolean = false
  stars =  [1, 2, 3, 4, 5]
  rating = 0

  constructor(private formBuilder : FormBuilder, private api: HotelService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      hotelName: [''],
      description: [''],
      district: ['selectDistrict'],
      region: ['selectRegion'],
      star: [this.rating],
      categories: ['categories'],
      numberOfRooms: ['']
    });  
      
  }

  updateRating(r: any) {
    this.rating = r
  } 

  getAllDatas() {
    this.api.get()
    .subscribe(res => {
      if(res) {
        this.datas = res                
      }
    })
  }

  onSubmit() {
    
  }
  
  updatedEmployeeDetails() {
    let data = {
      hotelName: this.editForm.value.hotelName,
      description: this.editForm.value.description,
      region: this.editForm.value.region,
      district: this.editForm.value.district,
      star: this.editForm.value.star,
      numberOfRooms: this.editForm.value.numberOfRooms,
      discategoriestrict: this.editForm.value.categories,
    }

    console.log(data);
    
    this.loading = true
    
    this.api.update(data) 
    .subscribe(res => {
      // this.spin = true
      let ref = document.getElementById("cancel")
      ref?.click()
      this.editForm.reset()
      
      this.toastr.success('User successfully updeted');
      this.loading = false
    })
  }

}
