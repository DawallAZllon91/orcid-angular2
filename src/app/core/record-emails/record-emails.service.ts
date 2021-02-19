import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms'
import { Observable, of, ReplaySubject } from 'rxjs'
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators'
import {
  Assertion,
  AssertionVisibilityString,
  EmailsEndpoint,
  ErrorsListResponse,
} from 'src/app/types'
import { environment } from 'src/environments/environment'

import { ErrorHandlerService } from '../error-handler/error-handler.service'

@Injectable({
  providedIn: 'root',
})
export class RecordEmailsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  })
  private $emailsSubject

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {}
  getEmails(forceReload = false): Observable<EmailsEndpoint> {
    if (!this.$emailsSubject) {
      this.$emailsSubject = new ReplaySubject<EmailsEndpoint>(1)
    } else if (!forceReload) {
      return this.$emailsSubject
    }

    this._http
      .get<EmailsEndpoint>(environment.API_WEB + `account/emails.json`, {
        headers: this.headers,
      })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error)),
        tap((value) => {
          this.$emailsSubject.next(value)
        })
      )
      .subscribe()
    return this.$emailsSubject
  }

  postEmails(otherNames: EmailsEndpoint): Observable<EmailsEndpoint> {
    return this._http
      .post<EmailsEndpoint>(
        environment.API_WEB + `account/emails.json`,
        otherNames,
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error)),
        switchMap(() => this.getEmails(true))
      )
  }

  addEmail(email: Assertion): Observable<EmailsEndpoint> {
    return this._http
      .post<Assertion>(environment.API_WEB + `account/addEmail.json`, email, {
        headers: this.headers,
      })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error)),
        switchMap(() => this.getEmails())
      )
  }

  verifyEmail(email: String): Observable<EmailsEndpoint> {
    return this._http
      .get<ErrorsListResponse>(
        environment.API_WEB + `account/verifyEmail.json?email=${email}`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error)),
        switchMap(() => this.getEmails())
      )
  }

  setAsPrimaryEmail(email: Assertion): Observable<EmailsEndpoint> {
    return this._http
      .post<Assertion>(
        environment.API_WEB + `account/email/setPrimary`,
        email,
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error)),
        switchMap(() => this.getEmails())
      )
  }

  validateRegisterValue(
    value: Assertion
  ): Observable<AssertionVisibilityString> {
    return this._http
      .post<AssertionVisibilityString>(
        environment.API_WEB + `account/validateEmail.json`,
        value
      )
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error))
      )
  }

  backendEmailValidate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null)
      }
      const value: Assertion = { value: control.value }

      return this.validateRegisterValue(value).pipe(
        map((res) => {
          if (res.errors.length > 0) {
            const error = {
              backendError: res.errors,
            }
            return error
          }
          return null
        })
      )
    }
  }
}
