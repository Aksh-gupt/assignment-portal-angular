import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthService } from './home/auth.service';
import { AdminService } from './admin/admin.service';
import { TeacherService } from './teacher/teacher.service';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { AllStudentComponent } from './admin/all-student/all-student.component';
import { AllTeacherComponent } from './admin/all-teacher/all-teacher.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { AssignmentComponent } from './teacher/assignment/assignment.component';
import { SubjectpageComponent } from './teacher/subjectpage/subjectpage.component';
import { StudentsubjectComponent } from './student/studentsubject/studentsubject.component';
import { StudentService } from './student/student.service';
import { SubjectassignmentComponent } from './student/subjectassignment/subjectassignment.component';
import { StudentsubmissionComponent } from './teacher/studentsubmission/studentsubmission.component';
import { ResetpasswordComponent } from './shared/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    StudentComponent,
    TeacherComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AllStudentComponent,
    AllTeacherComponent,
    SubjectComponent,
    AssignmentComponent,
    SubjectpageComponent,
    StudentsubjectComponent,
    SubjectassignmentComponent,
    StudentsubmissionComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule ,
    RouterModule,
    AppRoutingModule
  ],
  providers: [AuthService, AdminService, TeacherService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
