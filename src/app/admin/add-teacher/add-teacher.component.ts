import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  @ViewChild("f",{static: false}) addTeacher:NgForm;
  filled:boolean = false;
  constructor(private adminService:AdminService, private router: Router) { }

  ngOnInit() {
    this.filled = false;
  }

  onSubmit(){
    console.log(this.addTeacher.value);
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading...";
    this.adminService.createTeacher(this.addTeacher.value).subscribe(
      (response: any) => {
        // console.log(response);
        this.adminService.addTeacher(response);
        this.router.navigate(['/admin/teachers']);
      },(error) => {
        this.filled = false;
        document.getElementById("submit").innerHTML = "Submit";
        if(error.error.code === 11000){
          if(error.error.errmsg.includes("email")){
            document.getElementById("msg").innerHTML = "This email is already taken";
          }
        }
        else{
          document.getElementById("msg").innerHTML = "There is internal server error please try after some time";
        }
      }
    )
  }

}
