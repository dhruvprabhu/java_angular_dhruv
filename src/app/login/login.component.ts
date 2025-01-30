import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide: boolean = true;
  constructor(private router: Router) {}

  onLogin(){
    console.log(this.username)
    console.log(this.password)
    if(true){
      localStorage.setItem('username', this.username);
      this.router.navigate(['/home']);
    }else{
      if(this.username !== 'Dhruv')
        alert('Wrong username');
      if(this.password !== 'addverb')
        alert('Wrong password');
    }
  }
}
