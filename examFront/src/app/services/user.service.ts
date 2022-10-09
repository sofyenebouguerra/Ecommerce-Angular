import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/Modal';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const USERNAME_KEY = 'USERNAME';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8086/user';
  choixmenu : string  = 'A';
  host: string = 'http://localhost:8086/user';
  public formData:  FormGroup; 
  list:  any=[];
  constructor(private http:HttpClient) { }



  createData(info: Object): Observable<Object> {
  
    return this.http.post(`${this.baseUrl}/users`, info);
  }
  updatedata(id: number, value: any): Observable<Object> {
    this.choixmenu  = 'B';
    return this.http.put(`${this.baseUrl}/editUserImag${id}`, value);
  }
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }

  addUserr(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8086/user/addUser', user);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8086/user/admin/findAllUsers');
  }
  findUserById(id: any): Observable<User> {
    return this.http.get<User>(`http://localhost:8086/user/findUserById/${id}`);
  }
  editUser(user: User, idUser: number): Observable<User> {
    return this.http.put<User>(`http://localhost:8086/user/editUser/${idUser}`, user);
  }

  deleteUser(idUser: number): Observable<User> {
    return this.http.delete<User>(`http://localhost:8086/user/deleteUser/${idUser}`);
  }
  findByUsername(username: string): Observable<any> {
    return  this.http.get<any>(`http://localhost:8086/user/findByUsername/${username}`);
  }

  saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  signOut() {
    window.sessionStorage.clear();
  }

}
