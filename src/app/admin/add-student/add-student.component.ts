import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  @ViewChild('f', {static: false}) addStudent: NgForm;
  filled:boolean = false;
  batch:number;
  stream:number;
  section:number;
  constructor(private adminService:AdminService, private router:Router) { }

  ngOnInit() {
    this.filled = false;
    this.batch = 17;
    this.stream = 1;
    this.section = 1;
  }

  student:any = {
    name: "",
    enrollment: "",
    bss: 0,
    password: ""
  }

  onSubmit(){
    // console.log(this.addStudent.value);
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading...";
    this.student.name = this.addStudent.value.name;
    this.student.enrollment = this.addStudent.value.enroll;
    this.student.email = this.addStudent.value.email;
    var bss = this.batch;
    bss = bss*10 + this.section;
    bss = bss*10 + this.stream;
    this.student.bss = bss;
    this.student.password = this.addStudent.value.password;
    // console.log(this.student);
    this.adminService.createStudent(this.student).subscribe(
      (response: any) => {
        // console.log(response);
        this.adminService.addStudent(response);
        // this.authService.setToken(response.token,2);
        this.router.navigate(['/admin/students']);
      },(error) => {
        console.log(error);
        this.filled = false;
        document.getElementById("submit").innerHTML = "Submit";
        if(error.error.code === 11000){
          if(error.error.msg.includes("enrollment")){
            document.getElementById("msg").innerHTML = "This Enrollment number is already used";
          }
          else if(error.error.msg.includes("email")){
            document.getElementById("msg").innerHTML = "This Email is already used";
          }
        }
        else{
          document.getElementById("msg").innerHTML = "There is internal server error please try after some time";
        }
      }
    )
  }

}
