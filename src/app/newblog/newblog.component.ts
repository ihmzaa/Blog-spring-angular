import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface Blog {
  title: string;
  content: string;
}

@Component({
  selector: 'app-new-blog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.scss']
})
export class NewBlogComponent implements OnInit {

  newBlog: Blog = { title: '', content: '' };
  isAuthenticated = false;
  authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cookie: CookieService) {}

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    if (this.authToken) {
      this.isAuthenticated = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}` 
    });
  }
    
  createBlog() {
    if (!this.newBlog.title || !this.newBlog.content) {
      alert('Please provide both title and content for the blog.');
      return;
    }

    this.http.post("http://localhost:8080/blog/add", this.newBlog, { headers: this.getAuthHeaders() }).subscribe(
      () => {
        console.log('Blog created successfully');
        this.router.navigate(['/blogs']);
      },
      (error) => {
        console.error('Error creating blog:', error);
        alert('Error creating blog. Please check the console for details.');
      }
    );
  }
}
