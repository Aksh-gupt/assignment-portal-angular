import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Student } from '../../shared/student.model';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.css']
})
export class AllStudentComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  present:boolean = false;
  students:Student[] = [];
  updateStudent:any = {
    name: "",
    email: "",
    enrollment: ""
  }
  updateIndex:number;
  changeUpdate:boolean = false;  // THIS IS TO CHECK IF THERE IS CHANGE IN UPDATE FORM FROM PREVIOUS ENTRY OR NOT
  filled:boolean = false;
  updateSuccessfully:boolean = false;

  ngOnInit() {
    this.present = false;
    if(this.adminService.fetchStudents){
      this.students = this.adminService.getStudent();
      // console.log(this.students);
      this.present = true;
    }
    this.adminService.sendAllStudent.subscribe(
      (students: Student[]) => {
        this.students = students;
        // console.log(this.students);
        // console.log(this.teachers);
        this.present = true;
      }
    );
  }

  updateTeacherCall(student,ind){
    this.updateSuccessfully = false;
    this.changeUpdate = false;
    this.filled = false;

    this.updateStudent._id = student._id;
    this.updateStudent.name = student.name;
    this.updateStudent.enrollment = student.enrollment;
    this.updateStudent.email = student.email;

    this.updateIndex = ind;
  }

  onkeypress(){
    this.changeUpdate = false;
    setTimeout(() => {
      if(this.students[this.updateIndex].name !== this.updateStudent.name ||
        this.students[this.updateIndex].email !== this.updateStudent.email || 
        this.students[this.updateIndex].stream !== this.updateStudent.stream ||
        this.students[this.updateIndex].section !== this.updateStudent.section){
          this.changeUpdate = true;
      }
    },50)
  }

  onSubmit(){
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading..."
    const student = {
      name: this.updateStudent.name,
      email: this.updateStudent.email,
      enrollment: this.updateStudent.enrollment
    }
    if(this.students[this.updateIndex].name === this.updateStudent.name){
      delete student.name
    }
    if(this.students[this.updateIndex].email === this.updateStudent.email){
      delete student.email
    }
    if(this.students[this.updateIndex].enrollment === this.updateStudent.enrollment){
      delete student.enrollment
    }


    this.adminService.updateStudent(this.updateStudent._id, student).subscribe(
      (response:any) => {
        // console.log(response)
        response.forEach((res) => this.students[this.updateIndex][res] = this.updateStudent[res])
        this.updateSuccessfully = true;
        this.filled = true;
        document.getElementById("submit").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      },(error) => {
        console.log(error)
        this.filled = true;
        document.getElementById("submit").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      }
    )
  }

}
