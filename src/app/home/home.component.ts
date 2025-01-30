import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-user/add-edit-user.component';
import { UserService, User } from '../service/user.service';
import { MatTableModule } from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; 
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatIconModule, FormsModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title: string = 'Welcome to the Home Page!';
  username: string | null = null;
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  dataSource: User[] = [];
  filterValue: string = '';

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.username = localStorage.getItem('username');
    this.listUsers();
  }

  openAddUserDialog(){
    const dialogBox = this.dialog.open(AddEditComponent, {
      width: '400px',
      data: { title: 'Add User' },
    });

    dialogBox.afterClosed().subscribe(result => {
      if (result) {
        const newUser: User = {
          id: uuidv4(),
          username: result.username,
          password: result.password,
          role: result.role,
        };
        this.userService.addUser(newUser);
        this.listUsers(); 
      }
    });
  }

  openEditUserDialog(user: User){
    const dialogBox = this.dialog.open(AddEditComponent, {
      width: '400px',
      data: { title: 'Edit User', user: user },
    });

    dialogBox.afterClosed().subscribe(result => {
      if (result) {
        const updatedUser: User = {
          id: user.id, 
          username: result.username,
          password: result.password,
          role: result.role,
        };
        this.userService.updateUser(updatedUser);
        this.listUsers(); 
      }
    });
    this.dataSource.map
  }


  listUsers() {
    this.dataSource = [...this.userService.getUsers()];
    this.dataSource.length=0;
    this.dataSource=[]
  }

  applyFilter() {
    const filterValue = this.filterValue.trim().toLowerCase();
    this.dataSource = this.userService.getUsers().filter(user => 
      user.id.toLocaleString().includes(filterValue) ||
      user.username.toLowerCase().includes(filterValue) || 
      user.role.toLowerCase().includes(filterValue)
    );
  }
}
