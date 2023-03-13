import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { BaseService } from './base.service';

const routes = {
  signUp: 'customers'
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService extends BaseService<any> {
  constructor(
    http: HttpClient,private router: Router) {
    super(http);
  }

  signUp(payload: any): Observable<any> {
    return this.sendPost(this.baseUrl(`${routes.signUp}`), payload);
  }

}
