import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Subjects } from '../../shared/subject.model';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  fill:boolean = false;
  present:boolean = false;
  subjects:Subjects[] = [];

  updateSubject:Subjects;
  updateIndex:number;
  changeUpdate:boolean = false;  // THIS IS TO CHECK IF THERE IS CHANGE IN UPDATE FORM FROM PREVIOUS ENTRY OR NOT
  filled:boolean = false;
  updateSuccessfully:boolean = false;
  updatefilled:boolean = false;
  constructor(private adminService:AdminService) {
    this.fill = false;
    this.updatefilled = false;
  }

  ngOnInit() {
    this.present = false;
    this.updateSubject = new Subjects("","","","","");
    if(this.adminService.fetchTeachers){
      this.subjects = this.adminService.getSubject();
      console.log(this.subjects);
      this.present = true;
    }
    this.adminService.sendAllSubject.subscribe(
      (subjects: Subjects[]) => {
        this.subjects = subjects;
        console.log(this.subjects);
        this.present = true;
      }
    );
  }

  // TO DELETE SUBJECT
  deleteItem(_id:String, name:String){
    var r = confirm(`Do you want to delete ${name}`)
    if(!r){
      return;
    }
    this.adminService.deleteSubject(_id).subscribe(
      (response:any) => {
          this.adminService.deleteSubjectFromSubjects(_id);
          this.subjects = this.adminService.getSubject();
          console.log(this.subjects);
      },(error) =>{
          console.log(error,"this is error and this is written to mention that this is error");
      }
    )
  }

  // TO ADD NEW SUBJECT
  onSubmit(addSubject:NgForm){ 
    this.fill = true;
    document.getElementById("submit").innerHTML = "Loading..."
    this.adminService.createSubject(addSubject.value).subscribe(
      (response) => {
        console.log(response);
        this.adminService.addSubject(response);
        this.fill = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>";
        this.subjects = this.adminService.getSubject();
        addSubject.reset();
      },(error) => {
        console.log(error);
        this.fill = false;
        document.getElementById("submit").innerHTML = "Add <span class='glyphicon glyphicon-send'></span>";
        if(error.error.code === 11000){
          if(error.error.msg.includes("code")){
            document.getElementById("msg").innerHTML = "This Subject code is assign to another subject";
          }
          else if(error.error.msg.includes("subid")){
            document.getElementById("msg").innerHTML = "This subject id is assign to another subject";
          }
        }
        else{
          document.getElementById("msg").innerHTML = "There is internal server error please try after some time";
        }
      }
    )
  }

  // EDIT A SUBJECT
  updateSubjectCall(subject:Subjects,ind){
    this.updateSuccessfully = false;
    this.changeUpdate = false;

    this.updateSubject._id = subject._id;
    this.updateSubject.name = subject.name;
    this.updateSubject.type = subject.type;
    this.updateSubject.code = subject.code;
    this.updateSubject.subid = subject.subid;

    this.updateIndex = ind;
    // console.log(this.updateIndex);
    // console.log(this.updateTeacher);
  }

  onkeypress(){
    this.changeUpdate = false;

    
    setTimeout(() => {
      if(this.subjects[this.updateIndex].name !== this.updateSubject.name ||
        this.subjects[this.updateIndex].type !== this.updateSubject.type || 
        this.subjects[this.updateIndex].code !== this.updateSubject.code || 
        this.subjects[this.updateIndex].subid !== this.updateSubject.subid){
          this.changeUpdate = true;
      }
    },50)
  }

  onUpdate(){
    this.updatefilled = true;
    document.getElementById("update").innerHTML = "Loading..."
    const subject = {
      name: this.updateSubject.name,
      type: this.updateSubject.type,
      code: this.updateSubject.code,
      subid: this.updateSubject.subid
    }
    if(this.subjects[this.updateIndex].name === this.updateSubject.name){
      delete subject.name
    }
    if(this.subjects[this.updateIndex].type === this.updateSubject.type){
      delete subject.type
    }
    if(this.subjects[this.updateIndex].code === this.updateSubject.code){
      delete subject.code
    }
    if(this.subjects[this.updateIndex].subid === this.updateSubject.subid){
      delete subject.subid
    }

    console.log(subject);

    this.adminService.updateSubject(this.updateSubject._id,subject).subscribe(
      (response:any) => {
        // console.log(response)
        response.forEach((res) => this.subjects[this.updateIndex][res] = this.updateSubject[res])
        this.updateSuccessfully = true;
        this.updatefilled = false;
        document.getElementById("update").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      },(error) => {
        console.log(error)
        this.updatefilled = false;
        document.getElementById("update").innerHTML = 'Update <span class="glyphicon glyphicon-send"></span>'
      }
    )
    
  }
}
