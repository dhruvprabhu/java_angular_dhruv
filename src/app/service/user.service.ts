import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; 


export interface User {
  id: string;
  username: string;
  password: string,
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
   
  private users: User[] = [];
  constructor(){
    const defaultUser: User = {
      id: uuidv4(),
      username: "Dhruv",
      password: "Addverb123",
      role: "Intern"
    }
    this.addUser(defaultUser);
  }
  getUsers(){
    return this.users;
  }
  addUser(user: User){
    this.users.push(user);
  }
  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }



}
