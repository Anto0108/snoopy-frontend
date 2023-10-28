import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { BASE_SITE_URL, ROLE_ADMIN } from 'src/app/utility/const';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  imageName: string;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private customerService: CustomerService){
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required]
    });
    this.imageName = "";
  }
  ngOnInit(): void {
    let errorCode = 403;

    this.customerService.checkPermissions().subscribe(result => {
      if(result !== ROLE_ADMIN){
        this.router.navigate(['/error-page', errorCode]);
      }
    });
  }

  fileToUpload: File | null = null;

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.imageName = this.fileToUpload!.name;
    }
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('image', this.fileToUpload!, this.fileToUpload!.name);
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('description', this.postForm.get('description')?.value);
  
    this.adminService.addNewPost(formData).subscribe(id => {
      window.location.href = BASE_SITE_URL;
    });
  }
  
}
