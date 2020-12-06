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
 
  ngOnInit() {
    this.present = false;
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

}
