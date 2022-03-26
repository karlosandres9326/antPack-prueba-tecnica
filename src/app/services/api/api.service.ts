import { Injectable } from '@angular/core';
import { UserI } from '../../models/user.interface';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) {}

  getUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.url);
  }

}
