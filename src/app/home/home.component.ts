import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f', {static: false}) loginForm: NgForm;
  constructor(private router:Router, private authService:AuthService, private adminService:AdminService,
              private teacherService:TeacherService, private studentService:StudentService ) { }
  filled: boolean = false;
  authority:String = "student";
  criteria:String = "Enrollment number";


  ngOnInit() {
    if(this.authority === "student"){
      this.criteria = "Enrollment number"
    }
    else{
      this.criteria = "Email" 
    }
  }

  toForget(){
    const forgetBtn = document.getElementById('forget');
    const loginBtn = document.getElementById('login');
    forgetBtn.classList.remove('slide-up');
    loginBtn.classList.add('slide-up');
    console.log(loginBtn);
  }
 
  toLogin(){
    const forgetBtn = document.getElementById('forget');
    const loginBtn = document.getElementById('login');
    forgetBtn.classList.add('slide-up');
    loginBtn.classList.remove('slide-up');
  }
  user = {
    email : "",
    password: ""
  }

  errorOccur(status){
    this.filled = false;
    document.getElementById("submit").innerHTML = "Submit";
    if(status === 400){
      document.getElementById("msg").innerHTML = "Please enter valid credentials";
    }
    else{
      document.getElementById("msg").innerHTML = "500 Internal server error";
    }
  }

  loginTeacher(){
    // console.log("login teacher");
    this.authService.loginTeacher(this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setToken(response.token,2);
        this.teacherService.getSubjectName();
        this.teacherService.getMySubject()
        this.router.navigate(['/teacher']);
      },(error) => {
        this.errorOccur(error.status);
      }
    )
  }

  loginStudent(){
    this.authService.loginStudent(this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setToken(response.token,1);
        this.studentService.getSubjects();
        this.router.navigate(['/student']);
      },(error) => {
        this.errorOccur(error.status);
      }
    )
  }

  loginAdmin(){
    this.authService.loginAdmin(this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setToken(response.token,3);
        this.adminService.getAllTeacher();
        this.adminService.getAllStudent();
        this.adminService.getAllSubject();
        this.router.navigate(['/admin']);
      },(error) => {
        this.errorOccur(error.status);
      }
    )
  }

  onSubmit(){
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading...";
    this.user.email = this.loginForm.value.email
    this.user.password = this.loginForm.value.password
    if(this.authority === "student"){
      this.loginStudent();
    }
    else if(this.authority === "teacher"){
      this.loginTeacher();
    }
    else{
      this.loginAdmin();
    }
    // console.log(this.authority);
    // console.log(this.loginForm.value);
  }

}
