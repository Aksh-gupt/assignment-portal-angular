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
  constructor(private adminService:AdminService) {
    this.fill = false;
  }

  ngOnInit() {
    this.present = false;
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

  onClick(){
    console.log("this is on click");
  }

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
}
