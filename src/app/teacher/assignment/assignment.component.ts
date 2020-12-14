import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TeacherService } from '../teacher.service';
import { ShowAllAssignment } from '../../shared/showallassignment.model';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  present:boolean = false;

  filled:boolean = false;
  fileToUpload: File = null;
  fileSelected:boolean = false;
  docFormat:boolean = true;
  assignLastDate:string;
  newassignmentaddedsuccessfully:boolean = false;

  subid:string;
  bsss:string;

  filledUpdateDate:boolean = false;
  updateLastDate:string;
  currentLastDate:string;
  todaysDate:string;
  updateLastDateAssignmentId:string;
  updateAssignmentIndex:number;
  updateLastDateSuccessfully:boolean = false;

  allAssignment:ShowAllAssignment[] = []
  sem:number;
  room:string = "";

  fileUrl;
  constructor(private route:ActivatedRoute, private teacherService:TeacherService) {
    this.filled = false;
    this.fileSelected = false;
    this.docFormat = true;
  }

  ngOnInit() {
    var d = new Date();
    this.todaysDate = d.getFullYear() + "-"+ (d.getMonth()+1) + "-" + d.getDate();
    this.subid = this.route.snapshot.queryParams.subid;
    this.bsss = this.route.snapshot.queryParams.bsss;
    this.sem = Math.floor(parseInt(this.bsss)%10);
    var bss = parseInt(this.bsss);
    bss /= 10;
    this.room += this.stream(Math.floor(bss%10));
    bss /= 10;
    this.room += "-"
    this.room += Math.floor(bss%10).toString();
    // console.log(this.sem)
    // console.log(this.room)
    this.getAllAssignment();
  }

  stream(n){
    if(n == 1){
      return "CSE";
    }
    else if(n == 2){
      return "IT";
    }
    else if(n == 3){
      return "ECE";
    }
    return "EEE";
  }

  getAllAssignment(){
    const bss = Math.floor(parseInt(this.bsss)/10);
    const send = {
      subid: this.subid,
      bss: bss
    }
    this.teacherService.allAssignment(send).subscribe(
      (response:ShowAllAssignment[]) => {
        // console.log(response)
        this.allAssignment = response;
        // console.log(this.allAssignment);
        this.present = true;
      },(error) => {
        console.log(error)
      }
    )
  }

  newAssignmentCalls(){
    this.assignLastDate = null;
    this.newassignmentaddedsuccessfully = false;
  }

  onFileSelected(event){
    if(!event.target.files[0].name.endsWith(".pdf")){
      this.docFormat = false;
      this.fileToUpload = null;
      this.fileSelected = false;
    }
    else{
      this.docFormat = true;
      this.fileSelected = true;
      this.fileToUpload = <File>event.target.files[0]
    }
    // console.log(this.fileToUpload);
  }

  assignment:any = {
    name:String,
    bss:Number,
    subid: String,
    last:Date,
    description:String
  }

  onSubmit(f:NgForm){
    this.filled = true;
    document.getElementById("submit").innerHTML = "Loading..."
    var fd:FormData = new FormData();
    fd.append('document',this.fileToUpload,this.fileToUpload.name);
    // console.log(fd)
    // console.log(this.fileToUpload);
    // console.log(f.value)
    this.assignment.name = f.value.name;
    this.assignment.bss = Math.floor(parseInt(this.bsss)/10);
    this.assignment.subid = this.subid;
    this.assignment.last = f.value.last;
    this.assignment.description = f.value.description;
    const blobOverrides = new Blob([JSON.stringify(this.assignment)], {
      type: 'application/json',
    });
    fd.append('overrides', blobOverrides);

    this.teacherService.addAssignment(fd).subscribe(
      (response:any) => {
        // console.log(response)
        this.allAssignment.push(
          new ShowAllAssignment(response._id,response.name,response.last)
        )
        this.filled = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>";
        f.reset();
        this.newassignmentaddedsuccessfully = true;
      },(error) =>{
        console.log(error)
        this.filled = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>"
      }
    )
  }

  updateLastDateCalls(last:string,_id,ind){
    this.updateLastDateSuccessfully = false;
    this.updateLastDate = last;
    this.currentLastDate = last;
    this.updateLastDateAssignmentId = _id;
    this.updateAssignmentIndex = ind;
    // console.log(this.todaysDate);
    // console.log(this.updateLastDate);
  }

  updateSubmissionLastDate(){
    this.filledUpdateDate = true;
    document.getElementById("updatelast").innerHTML = "Loading...";
    const data = {
      _id: this.updateLastDateAssignmentId,
      last: this.updateLastDate
    }
    this.teacherService.updateAssignmentLastDate(data).subscribe(
      (response:any) => {
        console.log(response);
        this.allAssignment[this.updateAssignmentIndex].last = response.last;
        this.updateLastDateSuccessfully = true;
        this.filledUpdateDate = false;
        document.getElementById("updatelast").innerHTML = "Update <span class='glyphicon glyphicon-send'></span>";
      },(error) => {
        console.log(error);
        this.filledUpdateDate = false;
        document.getElementById("updatelast").innerHTML = "Update <span class='glyphicon glyphicon-send'></span>";
      }
    )
  }

  getAssignmentLoading:boolean = false;
  assignmentDetailDescription:string;
  assignmentDetailLastdate:string;
  getDescriptionAssignment(_id:string,ind){
    this.getAssignmentLoading = true;
    this.teacherService.getAssignmentDetails(_id).subscribe(
      (response:any) => {
        // console.log(response);
        this.assignmentDetailDescription = response.description;
        if(response.description === ""){
          this.assignmentDetailDescription = "---";
        }
        this.assignmentDetailLastdate = this.allAssignment[ind].last;
        this.getAssignmentLoading = false;
      },(error) => {
        console.log(error);
        this.getAssignmentLoading = false;
      }
    )
  }

  getAssignmentPdf(_id:string){
    this.teacherService.getAssignmentPdf(_id).subscribe(
      (response:any) => {
        // console.log(response);
        // saveAs(response, 'response.pdf');
        var file = new Blob([response], {
          type: 'application/pdf'
      })
      const url = window.URL;
      this.fileUrl = url.createObjectURL(file);
      window.open(this.fileUrl);
      }
      ,(error) => {
        console.log(error.error.text)
      }
    )
  }

}
