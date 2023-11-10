import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessUnit } from '../models/business-unit.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  userBaseUrl = 'assets/users.json';
  businessBaseUrl = 'assets/units.json';
  usersSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<User[]>(this.userBaseUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }


  getBusinessUnits(): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>(this.businessBaseUrl);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(newUser: any) {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = [...currentUsers, newUser];
    this.usersSubject.next(updatedUsers);
  }
}
