import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BASE_SITE_URL } from 'src/app/utility/const';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent  implements OnInit{
  
  constructor(private route: ActivatedRoute, private titleService: Title){}
  errorCode:number = 0;
  reason: string = '';
  errorCodeExplanation: string = '';

  ngOnInit(): void {
    this.errorCode = +this.route.snapshot.paramMap.get('errorCode')!;
    this.checkErrorCode();
  }

  checkErrorCode(){
    switch(this.errorCode){
      case 403:
        this.errorCodeExplanation = 'NON AUTORIZZATO.'
        this.reason = 'L\'accesso a questa risorsa ti è stata negata dal server';
        this.titleService.setTitle('403 - ERROR');

        setTimeout(() => {
          window.location.href = BASE_SITE_URL;
        }, 5000);
      break;
    }
  }
}
