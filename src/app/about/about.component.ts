import { Component, OnInit } from '@angular/core';
import { interval, timer, fromEvent, Observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { getHTTPObservable } from '../util/observable-utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.streamOfDataExample();
    // this.callbackHellExample();
    // this.intervalAndTimerOperatorsExample();
    // this.unsubscribeExample();
    // this.callBacksExample();
    // this.ownObservableExample();
    // this.getCoursesExample();
  }
  getCoursesExample() {
    const api = '/api/courses';
    const http$ = getHTTPObservable(api);

    const courses$ = http$.pipe(
      // pipe Creates Observable from an observable
      map(res => Object.values(res['payload']))
      // map transforms existing value of observable
    );

    courses$.subscribe(courses => console.log(courses), noop, () =>
      console.log('completed')
    );
  }
  ownObservableExample() {
    const api = 'api/courses';
    const http$ = getHTTPObservable(api);
    http$.subscribe(val => console.log(val));
  }

  callBacksExample() {
    // CALLBACKS
    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      event => console.log(event),
      error => console.log(error), // cannot emit after this or
      () => console.log('completed') // cannot emit after this
    );
  }
  unsubscribeExample() {
    // UNSUBSCRIBE
    const interval$ = interval(1000);
    const subscription = interval$.subscribe({
      next: val => console.log(val),
      complete: () => console.log('completed') // not called if unsubcribed
    }); // returns a subscription object
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('unsubscribed');
    }, 5000);
  }

  intervalAndTimerOperatorsExample() {
    // Interval & Timer operator
    // create blueprint of observabel
    const interval$ = interval(1000); // emits number after 1000ms
    const timer$ = timer(3000, 1000); // emits number after 3000ms every 1000ms
    // can create multiple streams using the blueprint
    // stream1
    interval$.subscribe(val => console.log('Subs 1:', val));
    interval$.subscribe(val => console.log('Subs 2:', val));
    timer$.subscribe(val => console.log('Subs Timer:', val));
    // from Event operator
    const click$ = fromEvent(document, 'click');
    click$.subscribe(event => console.log(event));
  }

  callbackHellExample() {
    // callback hell
    let counter = 0;
    // each click creates a new inifinite stream
    document.addEventListener('click', () => {
      setInterval(() => {
        counter++;
        console.log(counter);
      }, 1000);
      setTimeout(() => {
        console.log('finished..');
      }, 5000);
    });
  }

  streamOfDataExample() {
    // Stream of data examples
    // click
    document.addEventListener('click', event => {
      console.log(event);
    });
    let counter = 0;
    // setInterval
    setInterval(() => {
      counter++;
      console.log(counter);
    }, 1000);
    setTimeout(() => {
      console.log('Finished');
    }, 1000);
  }
}
