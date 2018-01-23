import {Injectable} from '@angular/core';
import {AsyncLocalStorage} from 'angular-async-local-storage';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {publish} from 'rxjs/operators';


export const LOGIN_DATA = 'loginData';

/**
 * Сервис доступа к IndexedDB (универсальный)
 */

@Injectable()
export class LocalStorageService {

  constructor(protected storage: AsyncLocalStorage) {
  }

  /**
   *
   * @param key
   * @param value
   * @returns {any}
   */
  public setItem<T>(key: string, value: T): Observable<T> {
    const obs = Observable.create((observer: Observer<T>) => {
      this.storage.setItem(key, value)
        .subscribe(
          () => {
            observer.next(value);
            observer.complete();
          },
          error => observer.error(error));
    }).pipe(publish());
    obs.connect();
    return obs;

  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public getItem<T>(key: string): Observable<T> {
    const obs = Observable.create((observer: Observer<T>) => {
      this.storage.getItem(key)
        .subscribe(
          (item: T) => {
            observer.next(item);
            observer.complete();
          },
          error => observer.error(error));
    }).pipe(publish());
    obs.connect();
    return obs;
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public removeItem(key: string): Observable<void> {
    const obs = Observable.create((observer: Observer<void>) => {
      this.storage.removeItem(key)
        .subscribe(
          () => {
            observer.complete();
          },
          error => observer.error(error));
    }).pipe(publish());
    obs.connect();
    return obs;
  }

}
