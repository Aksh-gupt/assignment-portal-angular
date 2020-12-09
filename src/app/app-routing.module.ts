import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTeacherComponent } from './admin/all-teacher/all-teacher.component';
import { SubjectpageComponent } from './teacher/subjectpage/subjectpage.component';
import { ShowassignmentComponent } from './teacher/showassignment/showassignment.component';
import { AssignmentComponent } from './teacher/assignment/assignment.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { AllStudentComponent } from './admin/all-student/all-student.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { StudentsubjectComponent } from './student/studentsubject/studentsubject.component';
import { SubjectassignmentComponent } from './student/subjectassignment/subjectassignment.component';
import { StudentsubmissionComponent } from './teacher/studentsubmission/studentsubmission.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'admin', component: AdminComponent, children:[
    {path: 'teachers',component: AllTeacherComponent },
    {path: 'students', component: AllStudentComponent},
    {path: 'addteacher', component: AddTeacherComponent},
    {path: 'addstudent', component: AddStudentComponent},
    {path: 'subject', component: SubjectComponent},
    {path: '**', redirectTo: 'teachers'}
  ]},
  {path:'teacher', component: TeacherComponent,children:[
    {path:'subject', component: SubjectpageComponent},
    {path: 'assignments', component: AssignmentComponent},
    {path: 'assignment/submissions', component: StudentsubmissionComponent},
    {path: 'assignment/:id', component: ShowassignmentComponent},
    {path: '**', redirectTo: 'subject'}
  ]},
  {path:'student', component: StudentComponent,children:[
    {path: 'subject', component: StudentsubjectComponent},
    {path: 'assignments', component: SubjectassignmentComponent},
    {path: '**', redirectTo: 'subject'}
  ]},
  {path: '**',redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
