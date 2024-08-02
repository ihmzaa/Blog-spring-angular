import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface Blog {
  autor: string;
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  blog: Blog = { id: 0, title: '', content: '', autor: '' };
  username: string = '';
  password: string = '';
  isAuthenticated = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private cookie: CookieService) {}

  ngOnInit() {
    this.username = this.cookie.get('username');
      this.password = this.cookie.get('password');

      if (this.username && this.password) {
        this.isAuthenticated = true;
        this.route.paramMap.subscribe(params => {
          const blogId = +params.get('id')!;
          if (blogId) {
            this.loadBlog(blogId);
          } else {
            console.error('Blog ID is missing');
            this.router.navigate(['/blogs']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });
  }

  loadBlog(id: number) {
    this.http.get<Blog>(`http://localhost:8080/blog/${id}`, { headers: this.getAuthHeaders() }).subscribe(
      (data) => {
        this.blog = data;
        this.blog.autor = this.username;
        console.log('Blog loaded for editing:', this.blog);
      },
      (error) => {
        console.error('Error loading blog:', error);
      }
    );
  }

  updateBlog() {
    if (this.blog.id) {
      this.http.put(`http://localhost:8080/blog/${this.blog.id}`, this.blog, { headers: this.getAuthHeaders() }).subscribe(
        () => {
          alert('Blog updated successfully');

          console.log('Blog updated successfully');
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Error updating blog:', error);
        }
      );
    } else {
      console.error('Blog ID is not set. Unable to update.');
    }
  }
}
