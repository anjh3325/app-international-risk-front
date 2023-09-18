import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentUrl = environment.url + '/comment';

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

  // get : 모든 댓글 가져오기
  getAllComment(): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(this.commentUrl)
      .pipe(
        catchError(
          this.handleError<Comment[]>(
            '예기치못한 오류가 발생했습니다. 다시 시도해주세요.'
          )
        )
      );
  }

  // post : 댓글 생성
  createComment(comment: Comment): Observable<Comment> {
    if (!comment.content || !comment.password) {
      catchError(this.handleError<Comment>(''));
    }
    return this.http
      .post<Comment>(this.commentUrl, comment, this.httpOptions)
      .pipe(catchError(this.handleError<Comment>('')));
  }
}
