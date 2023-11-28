import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from "ngx-owl-carousel-o";
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../components/auth/hotel.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  data: any;
  public createForm !: FormGroup
  selectedFile: any;
  previewUrl: any;
  hotelDate !: any 
  multiples:any[] = [];
  uploadPhoto: boolean = true;
  file:any;
  urls:any[] = [];
  loading: boolean = false
  stars =  [1, 2, 3, 4, 5]
  rating = 0
  isAd !: boolean
  isEdit !: boolean
  showAdd !: boolean
  showUpdate !: boolean
  
  constructor(private formBuilder : FormBuilder, private api: HotelService, private toastr: ToastrService, private router: Router) {}
  
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      description: ['', Validators.required],
      district: ['selectDistrict', Validators.required],
      region: ['selectRegion', Validators.required],
      star: [this.rating, Validators.required],
      categories: ['categories', Validators.required],
      numberOfRooms: ['', Validators.required]
    });
    
    this.isAd = true    
    this.getAllDatas()
  }
  
  updateRating(r: any) {
    this.rating = r
  } 
  
  addHotel() {    
    let data = {
      hotelName: this.createForm.value.hotelName,
      description: this.createForm.value.description,
      region: this.createForm.value.region,
      district: this.createForm.value.district,
      star: this.rating,
      numberOfRooms: this.createForm.value.numberOfRooms,
      categories: this.createForm.value.categories
    }
    
    
    this.api.post(data)
    .subscribe(res => {
      let ref = document.getElementById("cancel") 
      ref?.click() 
      this.createForm.reset() 
      this.toastr.success('new user added');  
      this.router.navigate(["/home"])
      this.loading = false 
    },
    err => {
      alert("Something went wrong")
      this.loading = false
    })
  }
  
  getAllDatas() {
    this.api.get()
    .subscribe(res => {
      if(res) {
      }
    })
  }  
  
}
