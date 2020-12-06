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

  ngOnInit() {
    this.present = false;
    if(this.adminService.fetchStudents){
      this.students = this.adminService.getStudent();
      console.log(this.students);
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

}
