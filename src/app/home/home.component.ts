import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HotelService } from '../components/auth/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  languages = ['eng', 'uz', 'ru']
  signUser: any = []
  datas!: any
  stars =  [1, 2, 3, 4, 5]
  rating = 0
  
  constructor(private translateService: TranslateService, private api: HotelService) {
    this.translateService.setDefaultLang('eng')
  }
  
  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem("user") || '{}')
    this.signUser.push(user)

    this.getAllDatas()
  }

  getAllDatas() {
    this.api.get()
    .subscribe(res => {
      if(res) {
        this.datas = res
        console.log(this.datas);
      }
    })
  }

  selectLang(lang: string) {
    this.translateService.use(lang)
  }
}
