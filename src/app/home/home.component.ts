import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(`🔎 | HomeComponent | interval > count:`, count);
    // });
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(
      (data) => {
        console.log(`🔎 | HomeComponent | firstObsSubscription > data:`, data);
      },
      (error) => {
        console.log(
          `🔎 | HomeComponent | firstObsSubscription > error:`,
          error
        );
        alert(error.message);
      },
      () => {
        console.log(`🔎 | HomeComponent | firstObsSubscription > Completed!`);
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
