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
  filled:boolean = false;
  fileToUpload: File = null;
  fileSelected:boolean = false;
  docFormat:boolean = true;
  subid:string;
  bsss:string;

  allAssignment:ShowAllAssignment[] = []
  sem:number;
  room:string = "";
  constructor(private route:ActivatedRoute, private teacherService:TeacherService) {
    this.filled = false;
    this.fileSelected = false;
    this.docFormat = true;
  }

  ngOnInit() {
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
        console.log(this.allAssignment);
      },(error) => {
        console.log(error)
      }
    )
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
          new ShowAllAssignment(response._id,response.name)
        )
        this.filled = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>"
      },(error) =>{
        console.log(error)
        this.filled = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>"
      }
    )
  }

}
