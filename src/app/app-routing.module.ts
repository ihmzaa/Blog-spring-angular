import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { NewBlogComponent } from './newblog/newblog.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'blogs', component: BlogsComponent },
  { path: 'newblog', component: NewBlogComponent },
  { path: 'login', component: LoginComponent},
  { path: 'edit/:id', component: EditComponent },
  { path: 'signup', component:SignupComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
