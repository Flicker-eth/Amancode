import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private utility:UtilityService,private navi:NavigationService,private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.utility.getToken();
    if(myToken){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request);
  }
}
