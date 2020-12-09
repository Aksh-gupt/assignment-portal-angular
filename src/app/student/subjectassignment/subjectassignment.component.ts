import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { ShowStudentAssignment } from '../../shared/showstudentassignmentpending.model';
import { StudentCompleteAssignment } from '../../shared/studentcompleteassignment.model';

@Component({
  selector: 'app-subjectassignment',
  templateUrl: './subjectassignment.component.html',
  styleUrls: ['./subjectassignment.component.css']
})
export class SubjectassignmentComponent implements OnInit {
  filled:boolean = false;
  subid:string;
  bsss:string;
  subject:string;
  sem:number;
  stream:string;
  section:number;
  assignmentsPending:ShowStudentAssignment[] = [];
  assignmentsComplete:ShowStudentAssignment[] = [];
  completeAssignmentId:StudentCompleteAssignment[] = [];

  getDescriptionLoading:boolean = false;
  assignmentDescription:any = {
    last: "",
    description: "",
    teachername: "",
    teacherdept: ""
  }

  AssignmentFile:File = null;

  assignmentId:string;

  constructor(private route:ActivatedRoute, private studentService:StudentService) {
    this.getDescriptionLoading = false;
  }

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
    this.stream = this.convertToStream(bss%10);
    bss = Math.floor(bss/10);
    this.section = bss%10;

    

    this.studentService.allMyAssignment(this.subid).subscribe(
      (response:any) => {
        // console.log(response,"this")
        var len = response.length;
        for(var i=0;i<len;i++){
          this.completeAssignmentId.push(
            new StudentCompleteAssignment(response[i].assignmentid,response[i].status,response[i].createdAt)
          );
        }
        // console.log(this.completeAssignmentId);
        this.callGetAssignment(body)
      },(error) => {
        console.log(error);
        this.callGetAssignment(body)
      }
    )
  }

  callGetAssignment(body){
    this.studentService.getAssignments(body).subscribe(
      (response:any) => {
        // console.log(response)
        var len1 = this.completeAssignmentId.length;
        var len = response.length;
        for(var i=0;i<len;i++){
          var flag = 0;
          var status,createdAt;
          for(var j=0;j<len1;j++){
            if(response[i]._id === this.completeAssignmentId[j]._id){
              // console.log(this.completeAssignmentId[j].status)
              status = this.completeAssignmentId[j].status;
              createdAt = this.completeAssignmentId[j].createdAt;
              flag = 1;
              break;
            }
          }
          if(!flag){
            this.assignmentsPending.push(
              new ShowStudentAssignment(response[i]._id,response[i].name)
            )
          }
          else{
            // console.log(status);
            this.assignmentsComplete.push(
              new ShowStudentAssignment(response[i]._id,response[i].name,status,createdAt)
            )
          }
          
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

  getDescription(_id:string){
    this.getDescriptionLoading = true;
    this.studentService.getDescriptionOfAssignment(_id).subscribe(
      (response:any) => {
        // console.log(response);
        this.assignmentDescription.last = response.assignment.last;
        this.assignmentDescription.description = response.assignment.description;
        this.assignmentDescription.teachername = response.teacher.name;
        this.assignmentDescription.teacherdept = response.teacher.department;
        this.getDescriptionLoading = false;
      },(error) => {
        console.log(error);
        this.getDescriptionLoading = false;
      }
    )
  }

  dragOverEffect(){
    document.getElementById("dropzone").className = "dropzone dragover";
    return false;
  }
  dragLeaveEffect(){
    document.getElementById("dropzone").className = "dropzone";
    return false;
  }
  manyFiles:boolean = false;
  drop(event){
    event.preventDefault();
    document.getElementById("dropzone").className = 'dropzone'
    // console.log(event.dataTransfer.files);
    this.manyFiles = false;
    this.docFormat = true;
    if(event.dataTransfer.files.length > 1){
      this.manyFiles = true;
    }
    else if(!event.dataTransfer.files[0].name.endsWith(".pdf")){
      this.docFormat = false;
    }
    else{
      this.fileSelected = true;
      this.AssignmentFile = <File>event.dataTransfer.files[0];
    }
  }

  docFormat:boolean = true;
  fileSelected:boolean = false;
  onFileSelected(event){
    this.manyFiles = false;
    if(!event.target.files[0].name.endsWith(".pdf")){
      this.docFormat = false;
      this.AssignmentFile = null;
      this.fileSelected = false;
    }
    else{
      this.docFormat = true;
      this.fileSelected = true;
      this.AssignmentFile = <File>event.target.files[0];
    }
    // console.log(this.AssignmentFile);
  }

  submitAssignmentCalls(id:string){
    this.assignmentId = id; 
  }

  submitSuccessfully:boolean = false;
  submitAssignment(){
    var fd:FormData = new FormData();
    fd.append('document',this.AssignmentFile,this.AssignmentFile.name);

    const overrides = {
      subid: this.subid,
      _id: this.assignmentId
    }
    const blobOverrides = new Blob([JSON.stringify(overrides)], {
      type: 'application/json',
    });
    fd.append('overrides', blobOverrides);
    this.studentService.submitAssignment(fd).subscribe(
      (response:any) => {
        // console.log(response)
        this.assignmentsPending = this.assignmentsPending.filter((assignment) => {
          if(assignment._id === this.assignmentId){
            assignment.change(response.status, response.createdAt);
            this.assignmentsComplete.push(assignment);
            return false;
          }
          return true;
        })
        this.submitSuccessfully = true;
      },(error) => {
        console.log(error)
      }
    )
  }

}
