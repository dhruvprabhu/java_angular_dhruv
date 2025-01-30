import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,   
  FormBuilder,  
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../service/user.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditComponent {
  roles: Role[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'Manager', viewValue: 'Manager' },
    { value: 'Intern', viewValue: 'Intern' },
  ];
  hide: boolean = true;
  addEditForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: { title: string , user: User}
    ) {}

  ngOnInit() {
    const xyz = 2<3?'a':'b';
    console.log(xyz);
    this.addEditForm = this.fb.group(
        {
          username: [this.data.user ? this.data.user.username : '', Validators.required],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
          role: [this.data.user ? this.data.user.role : '', Validators.required],
          
        },
        { validators: this.passwordsMatchValidator }
      );
  
      
      
  }

  passwordsMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ missmatch: true });
      }
    }
  }
  
}
