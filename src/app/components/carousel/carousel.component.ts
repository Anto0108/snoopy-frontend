import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
//PRENDERE I PATH DELLE IMAGE DAL DB
images = [
  '../../../assets/images/logo.jpg',
  'path/to/image2.jpg',
  'path/to/image3.jpg'
];
activeIndex = 0;

previousImage() {
  this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
}

nextImage() {
  this.activeIndex = (this.activeIndex + 1) % this.images.length;
}
}
