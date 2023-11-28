import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HotelService } from '../components/auth/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  
  signUser: any = []
  datas!: any
  stars =  [1, 2, 3, 4, 5]
  rating = 0
  selectedRow : any
  loading = false
  spin !: boolean
  isloading !: boolean
  isEdit !: boolean
  public createForm !: FormGroup
  public editForm !: FormGroup
  id !: number
  
  constructor(private formBuilder : FormBuilder, private translateService: TranslateService, private api: HotelService,  private toastr: ToastrService) {
    this.translateService.setDefaultLang('eng')
  }
  
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
    
    this.editForm = this.formBuilder.group({
      hotelName : new FormControl(),
      description: ['', Validators.required],
      district: ['selectDistrict', Validators.required],
      region: ['selectRegion', Validators.required],
      star: [this.rating, Validators.required],
      categories: ['categories', Validators.required],
      numberOfRooms: ['', Validators.required]
    });
    
    var user = JSON.parse(localStorage.getItem("user") || '{}')
    this.signUser.push(user)
    
    this.getAllDatas()
    
  }
  
  getAllDatas() {
    this.api.get()
    .subscribe(res => {
      if(res) {
        this.datas = res        
      }
    })
  }
  
  delete(item:any) {
    this.selectedRow = item
    
  }
  
  deleteCofirm() {
    this.loading = true
    if(this.selectedRow) {
      this.api.delete(this.selectedRow.id)
      .subscribe(res => { 
        
        this.toastr.success('User successfully deleted');
        this.getAllDatas()
        this.loading = false
        let ref = document.getElementById("cancel1")
        ref?.click()
      })
    }
  }
  
  updateRating(r: any) {
    this.rating = r
  }
  
  onSubmit() {
    
  }
  
  onEdit(hotel: any) {
    this.editForm.controls['hotelName'].setValue(hotel.hotelName)
    this.editForm.controls['description'].setValue(hotel.description)
    this.editForm.controls['region'].setValue(hotel.region)
    this.editForm.controls['district'].setValue(hotel.district)
    this.editForm.controls['star'].setValue(hotel.star)
    this.editForm.controls['numberOfRooms'].setValue(hotel.numberOfRooms)
    this.editForm.controls['categories'].setValue(hotel.categories)
    this.id = hotel.id
    console.log('hotel', hotel.id);
  }
  
  updatedEmployeeDetails() {
    let data = {
      id: this.id, 
      hotelName: this.editForm.value.hotelName,
      description: this.editForm.value.description,
      region: this.editForm.value.region,
      district: this.editForm.value.district,
      star: this.editForm.value.star,
      numberOfRooFms: this.editForm.value.numberOfRooms,
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
      this.getAllDatas()
      
      this.toastr.success('User successfully updeted');
      this.loading = false
    })
  }
}
