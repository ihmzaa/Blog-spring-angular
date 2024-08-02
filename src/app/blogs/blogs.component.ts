import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class BlogsComponent implements OnInit {
  selectedBlog: any = null;
  blogs: any[] = [];
  currentUser: any;
  UserRole: any;
  isAuthenticated = false;
  authToken: string | null = null;
  blogState: { [id: number]: string } = {}; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    
    if (this.authToken) {
      this.isAuthenticated = true;
      this.loadBlogs();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}` 
    });
  }



  loadBlogs() {
    this.http.get<any[]>('http://localhost:8080/blog', { headers: this.getAuthHeaders() }).subscribe(
      data => {
        this.blogs = data;
        this.blogs.forEach(blog => this.blogState[blog.id] = 'collapsed');
      },
      error => {
        console.error('Error loading blogs:', error);
      }
    );
  }
  
  selectBlog(blog: any) { 
    this.blogState[blog.id] = this.blogState[blog.id] === 'collapsed' ? 'expanded' : 'collapsed';
    this.selectedBlog = this.selectedBlog === blog ? null : blog;
  }

  deleteBlog(id: number) {
    if (this.UserRole === "ADMIN") {
      
    this.http.delete(`http://localhost:8080/blog/${id}`, { headers: this.getAuthHeaders(), responseType: 'text' }).subscribe(
      () => {
        this.loadBlogs();
        alert('Blog deleted successfully');
      },
      error => {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog');
      }
    );
    }
    else{
      alert('Sorry, you don\'t have access');
    }
  }

  navigateToEditBlog(blogId: number) {
    if (this.UserRole === "EDITOR" || this.UserRole === "ADMIN") {
      this.router.navigate(['/edit', blogId]);
    } else {
      alert('Sorry, you don\'t have access');
    }
  }

  navigateToNewBlog() {
    this.router.navigate(['newblog']);
  }

  logout() {
    this.cookieService.delete('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
