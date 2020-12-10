import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeacherService } from '../teacher.service';
import { StudentSubmission } from '../../shared/studentsubmission.model';

@Component({
  selector: 'app-studentsubmission',
  templateUrl: './studentsubmission.component.html',
  styleUrls: ['./studentsubmission.component.css']
})
export class StudentsubmissionComponent implements OnInit {
  subid:string;
  assignmentid:string;
  present:boolean = false;
  submittedStudent:StudentSubmission[] = [];
  ownerEnrollmentStore:String[] = [];
  ownerEnrollment:String;
  enrollPresent:boolean = false;
  constructor(private route:ActivatedRoute, private teacherService:TeacherService) { }

  ngOnInit(): void {
    this.present = false;
    this.subid = this.route.snapshot.queryParams.subid;
    this.assignmentid = this.route.snapshot.fragment;

    this.teacherService.getStudentSubmission(this.subid,this.assignmentid).subscribe(
      (response:any) => {
        // console.log(response);
        response.forEach(res => {
          this.submittedStudent.push(
            new StudentSubmission(res._id,res.name,res.owner,res.status,res.createdAt,res.updatedAt)
          )
        });
        this.submittedStudent.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
        // console.log(this.submittedStudent);
        this.intialiseOwnerEnrollment();
        this.present = true;
      },(error)=>{
        this.present = true;
        console.log(error);
      }
    )
  }


  intialiseOwnerEnrollment(){
    var len = this.submittedStudent.length;
    for(var i=0;i<len;i++){
      this.ownerEnrollmentStore.push("");
    }
  }

  getEnrollment(owner,ind){
    this.enrollPresent = false;
    if(this.ownerEnrollmentStore[ind] !== ""){
      this.ownerEnrollment = this.ownerEnrollmentStore[ind];
      this.enrollPresent = true;
      return;
    }
    // console.log("this");
    this.teacherService.getEnrollmentStudent(owner).subscribe(
      (response:any) => {
        console.log(response);
        this.ownerEnrollmentStore[ind] = response.enrollment;
        this.ownerEnrollment = response.enrollment;
        this.enrollPresent = true;
      },(error) => {
        console.log(error);
      }
    )
  }

  changeStatus(_id,status,name,ind){
    var str = "";
    if(status === "accepted"){
      str += "Accept";
    }
    else{
      str += "Reject";
    }
    var d = confirm(`${str} ${name}'s assignment`);
    if(!d){
      return;
    }
    const data = {
      _id: _id,
      assignmentid: this.assignmentid,
      status: status
    }
    
    console.log(data);
    this.teacherService.changeStatusOfAssignmentSolution(data).subscribe(
      (response:any) => {
        console.log(response);
        this.submittedStudent[ind].status = response.status;
      },(error) => {
        console.log(error);
      }
    )
  }

}
