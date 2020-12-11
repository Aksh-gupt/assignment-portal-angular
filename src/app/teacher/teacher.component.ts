import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../home/auth.service';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  auth:boolean = false;
  name:string;
  reset:boolean = true;
  constructor(private authService:AuthService, private router: Router, private teacherService:TeacherService) { }

  ngOnInit() { 
    if(this.authService.authorise !== 2){
      this.router.navigate(['/']);
    }
    else if(this.authService.authorise === 2){
        this.auth = true;
        this.teacherService.getTeacherInfo().subscribe(
          (response:any) => {
            console.log(response);
            this.name = response.name;
            this.reset = response.reset;
          },(error)=>{
            console.log(error);
          }
        )
    }
  }

  onLogout(){
    this.authService.teacherLogout();
  }

  resetPassword(){
    var d = confirm("Are you want to reset password.");
    if(!d){
      return;
    }
    this.teacherService.resetPassword().subscribe(
      (response:any) => {
        console.log(response);
        this.authService.teacherLogout();
        alert("Please check your email for reset password url. We are going to logout you");
      },(error) => {
        console.log(error);
      }
    )
  }
}
