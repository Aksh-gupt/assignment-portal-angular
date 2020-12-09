import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../home/auth.service';
import { AdminService } from '../admin.service';
import { Teacher } from '../../shared/teacher.model';

@Component({
  selector: 'app-all-teacher',
  templateUrl: './all-teacher.component.html',
  styleUrls: ['./all-teacher.component.css']
})
export class AllTeacherComponent implements OnInit {

  constructor(private authService:AuthService, private adminService:AdminService) { }
  present:boolean = false;
  teachers:Teacher[] = [];
  updateTeacher:Teacher;
  updateIndex:number;
  changeUpdate:boolean = false;  // THIS IS TO CHECK IF THERE IS CHANGE IN UPDATE FORM FROM PREVIOUS ENTRY OR NOT
  filled:boolean = false;
  updateSuccessfully:boolean = false;

  updateTeacherCall(teacher,ind){
    this.updateSuccessfully = false;
    this.changeUpdate = false;

    this.updateTeacher._id = teacher._id;
    this.updateTeacher.name = teacher.name;
    this.updateTeacher.department = teacher.department;
    this.updateTeacher.email = teacher.email;

    this.updateIndex = ind;
    // console.log(this.updateIndex);
    // console.log(this.updateTeacher);
  }

  ngOnInit() {
    this.present = false;
    this.updateTeacher = new Teacher("","","","");
    if(this.adminService.fetchTeachers){
      this.teachers = this.adminService.getTeacher();
      this.present = true;
    }
    this.adminService.sendAllTeacher.subscribe(
      (teachers: Teacher[]) => {
        this.teachers = teachers;
        // console.log(this.teachers);
        this.present = true;
      }
    );
  }

  onkeypress(){
    this.changeUpdate = false;
    
    setTimeout(() => {
      if(this.teachers[this.updateIndex].name !== this.updateTeacher.name ||
        this.teachers[this.updateIndex].email !== this.updateTeacher.email || 
        this.teachers[this.updateIndex].department !== this.updateTeacher.department){
          this.changeUpdate = true;
      }
    },50)
  }

  onSubmit(){
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading..."
    const teacher = {
      name: this.updateTeacher.name,
      email: this.updateTeacher.email,
      department: this.updateTeacher.department
    }
    if(this.teachers[this.updateIndex].name === this.updateTeacher.name){
      delete teacher.name
    }
    if(this.teachers[this.updateIndex].email === this.updateTeacher.email){
      delete teacher.email
    }
    if(this.teachers[this.updateIndex].department === this.updateTeacher.department){
      delete teacher.department
    }

    this.adminService.updateTeacher(this.updateTeacher._id, teacher).subscribe(
      (response) => {
        // console.log(response)
        this.teachers[this.updateIndex].name = this.updateTeacher.name;
        this.teachers[this.updateIndex].email = this.updateTeacher.email;
        this.teachers[this.updateIndex].department = this.updateTeacher.department;
        this.updateSuccessfully = true;
        this.filled = false;
        document.getElementById("submit").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      },(error) => {
        console.log(error)
        this.filled = false;
        document.getElementById("submit").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      }
    )
  }

}
