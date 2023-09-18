import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { User } from '../model/user.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = environment.url + '/user';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  createUser(user: User): Observable<User> {
    if (!user.name) {
      catchError(this.handleError<User>('값을 입력해주세요.'));
    }
    if (user.password.length < 4) {
      catchError(this.handleError<User>('4글자 이상으로 입력해주세요.'));
    }

    return this.http
      .post<User>(this.userUrl + '/create', user, this.httpOptions)
      .pipe(catchError(this.handleError<User>(`중복된 이름입니다.`)));
  }

  signInUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl + '/signIn', user, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<User>('아아디 또는 비밀번호가 일치하지 않습니다.')
        )
      );
  }
  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.userUrl, user, this.httpOptions);
  }
}
