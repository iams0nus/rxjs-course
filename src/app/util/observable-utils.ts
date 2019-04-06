import { Observable } from 'rxjs';

export function getHTTPObservable(api) {
  const http$ = Observable.create(observer => {
    fetch(api)
      .then(response => response.json())
      .then(body => {
        // console.log(body);
        observer.next(body);
      })
      .catch(error => error);
  });
  return http$;
}
