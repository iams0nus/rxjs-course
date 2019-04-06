import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, Observable, of, timer } from 'rxjs';
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap
} from 'rxjs/operators';
import { getHTTPObservable } from '../util/observable-utils';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Anti-pattern
  beginnerCourses: Course[];
  advancedCourses: Course[];
  // Reactive Pattern
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  ngOnInit() {
    const http$ = getHTTPObservable('/api/courses');
    const courses$ = http$.pipe(
      map(courses => Object.values(courses['payload']))
    );
    // this.antiPatternExample(courses$);
    this.reactivePatternExample(courses$);
  }

  antiPatternExample(courses$: Observable<Course[]>) {
    courses$.subscribe(courses => {
      this.beginnerCourses = courses.filter(
        course => course.category === 'BEGINNER'
      );
      this.advancedCourses = courses.filter(
        course => course.category === 'ADVANCED'
      );
    });
  }

  reactivePatternExample(courses$: Observable<Course[]>) {
    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );
  }
}
