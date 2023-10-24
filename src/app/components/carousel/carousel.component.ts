import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IMAGE_PATH } from 'src/app/utility/const'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  constructor(private adminService: AdminService){}

  imagePath = IMAGE_PATH;

  getAllPost(){
    this.adminService.getAllPost().subscribe(posts => {
      if (posts && Array.isArray(posts)) {
        posts.forEach(post => {
          console.log(post.id, post.postName, post.imageName, post.description);
        });
      } else {
          console.log('Nessuna risposta valida ricevuta.');
      }
    });
  }

  images = [''];

  ngOnInit(): void {
    this.adminService.getAllPost().subscribe(posts => {
      if (posts) {
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
}
