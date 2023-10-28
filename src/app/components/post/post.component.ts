import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { Comment } from 'src/app/model/comment.model';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { IMAGE_PATH } from 'src/app/utility/const';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  commentForm: FormGroup;

  postID: number = 0;
  constructor(private fb: FormBuilder, private adminService: AdminService, private route: ActivatedRoute, private customerService: CustomerService,
              private datePipe: DatePipe){
    this.commentForm = this.fb.group({
      comment: [{value: '',  disabled: this.token === null}]
    });
  }
  token:string | null = '';

  ngOnInit(): void {
    this.postID = +this.route.snapshot.paramMap.get('id')!;
    this.getPostForThePage(this.postID);

    //SERVIZIO CHE PRENDE TUTTI I COMMENTI PER UN CERTO ID
    this.getAllCommentsByPostId();
    this.token = this.customerService.getToken();
  }

  description:string | undefined;
  imageName:string | undefined;
  postName:string | undefined;
  imagePath = IMAGE_PATH;

  getPostForThePage(id: number) {
    this.customerService.getPostForThePage(id).subscribe((post: Post | null) => {
      if (post) {
        this.description = post.description;
        this.imageName = post.imageName;
        this.postName = post.postName;
      } else {
        console.log('Nessun post ricevuto.');
      }
    });
  }

  onSubmit(){
    const commentModel = {
      commentText: this.commentForm.get('comment')?.value
    }

    this.customerService.sendComment(commentModel, this.postID).subscribe(response => {
      if (response) {
        this.getAllCommentsByPostId();
        window.location.reload();
      }
    });
  }

  commentIsPresent = false;
  commentArrayForPost: Comment[] = [];

  getAllCommentsByPostId(){
    this.customerService.getAllCommentByPostId(this.postID).subscribe((response: Comment[] | null) => {
      if (response && response.length !== 0) {
        this.commentIsPresent = true;
        this.commentArrayForPost = response.reverse();

        this.commentArrayForPost.forEach(comment => {
          comment.creationDate = this.datePipe.transform(comment.creationDate, 'yyyy-MM-dd HH:mm')!;
        });
      }
    });
  }
}
