import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth.service';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  auth:boolean = false;
  name:string;
  reset:boolean = true;
  constructor(private authService:AuthService, private studentService:StudentService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.authorise !== 1){
      this.router.navigate(['/']);
    }
    else if(this.authService.authorise === 1){
      this.auth = true;
      this.studentService.getStudentInfo().subscribe(
        (response:any) => {
          // console.log(response);
          this.name = response.name;
          this.reset = response.reset;
        },(error)=>{
          console.log(error);
        }
      )
    }
  }

  resetPassword(){
    var d = confirm("Are you want to reset password.");
    if(!d){
      return;
    }
    this.studentService.resetPassword().subscribe(
      (response:any) => {
        console.log(response);
        alert("Please check your email for reset password url. We are going to logout you");
        this.authService.studentLogout();
      },(error) => {
        console.log(error);
      }
    )
  }

  onLogout(){
    this.authService.studentLogout();
  }

}
