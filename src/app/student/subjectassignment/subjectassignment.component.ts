import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { ShowStudentAssignment } from '../../shared/showstudentassignment.model';

@Component({
  selector: 'app-subjectassignment',
  templateUrl: './subjectassignment.component.html',
  styleUrls: ['./subjectassignment.component.css']
})
export class SubjectassignmentComponent implements OnInit {
  subid:string;
  bsss:string;
  subject:string;
  sem:number;
  stream:string;
  section:number;
  assignments:ShowStudentAssignment[] = [];
  constructor(private route:ActivatedRoute, private studentService:StudentService) { }

  ngOnInit(): void {
    this.subid = this.route.snapshot.queryParams.subid;
    this.bsss = this.route.snapshot.queryParams.bsss;
    this.subject = this.route.snapshot.fragment;
    this.sem = parseInt(this.bsss)%10;
    var bss = Math.floor(parseInt(this.bsss)/10);
    const body = {
      subid: this.subid,
      bss: bss
    }
    this.stream = this.convertToStream(parseInt(this.bsss)%10);
    bss = Math.floor(bss/10);
    this.section = bss%10;

    this.studentService.getAssignments(body).subscribe(
      (response:any) => {
        console.log(response)
        var len = response.length;
        for(var i=0;i<len;i++){
          this.assignments.push(
            new ShowStudentAssignment(response[i]._id,response[i].name,response[i].description,response[i].last)
          )
        }
        
      },(error) => {
        console.log(error)
      }
    )
  }

  convertToStream(n:number){
    if(n === 1){
      return "CSE";
    }
    else if(n === 2){
      return "IT";
    }
    else if(n === 3){
      return "ECE";
    }
    return "EEE";
  }

}
