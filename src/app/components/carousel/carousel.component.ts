import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { IMAGE_PATH } from 'src/app/utility/const'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
  constructor(private adminService: AdminService, private router: Router, private customerService: CustomerService){}

  imagePath = IMAGE_PATH;
  posts: Post[] = [];
  images = [''];
  postExist = false;

  ngOnInit(): void {
    this.customerService.getAllPost().subscribe(posts => {
      if (posts && Array.isArray(posts) && posts.length !== 0) {
        this.postExist = true;
        this.posts = posts;
        this.images = posts.map(post => post.imageName); 
      }
    });
  }

  activeIndex = 0;

  previousImage() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  updateId(id: number){
    this.router.navigate(['/post', id]);
  }
}
