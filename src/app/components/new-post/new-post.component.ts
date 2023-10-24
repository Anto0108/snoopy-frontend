import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { BASE_SITE_URL } from 'src/app/utility/const';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  postForm: FormGroup;
  imageName: string;

  constructor(private fb: FormBuilder, private adminService: AdminService){
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required]
    });
    this.imageName = "";
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.imageName = file.name;
    }
    
  }

  onSubmit() {
    const post = {
      postName: this.postForm.get('title')?.value,
      description: this.postForm.get('description')?.value,
      imageName: this.imageName
    }

    this.adminService.addNewPost(post).subscribe(id => {
      //TUTTO IL CODICE CHE è CORRELATO ALL'ID DEL POST DEVE ESSERE FATTO QUI
      window.location.href = BASE_SITE_URL;
    });
  }
}
