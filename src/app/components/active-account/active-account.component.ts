import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { BASE_SITE_URL } from 'src/app/utility/const';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit, OnDestroy {
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
    this.customerService.activeAccount(this.customerId).subscribe(result => {
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
