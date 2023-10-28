import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval, take } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { BASE_SITE_URL } from 'src/app/utility/const';

@Component({
  selector: 'app-disattiva-newsletter',
  templateUrl: './disattiva-newsletter.component.html',
  styleUrls: ['./disattiva-newsletter.component.css']
})
export class DisattivaNewsletterComponent implements OnInit, OnDestroy{
  customerId: string = '';
  timer: number = 5;
  private countdownSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private customerService: CustomerService){
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.customerId = id;
    });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  error: string | null = null; 
  ngOnInit(): void {
    this.customerService.deactivateNewsLetter(this.customerId).subscribe(result => {
      if (result) {
        this.startCountdown();
      }
    },
    error => {
      this.error = error.error.error;
      this.startCountdown();
    });
  }

  startCountdown() {
    this.countdownSubscription = interval(1000)
      .pipe(take(this.timer)).subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          window.location.href = BASE_SITE_URL;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
