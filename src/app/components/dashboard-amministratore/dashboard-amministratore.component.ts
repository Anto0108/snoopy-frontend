import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PostAdminModel } from 'src/app/model/post.admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-amministratore',
  templateUrl: './dashboard-amministratore.component.html',
  styleUrls: ['./dashboard-amministratore.component.css']
})
export class DashboardAmministratoreComponent implements OnInit{

  constructor(private adminService: AdminService, private router: Router){}

  postList: PostAdminModel[] = [];
  displayedColumns: string[] = ['id', 'postName', 'numberOfComment', 'actions'];
  dataSource = new MatTableDataSource<PostAdminModel>([]);
  
  ngOnInit(): void {
    this.adminService.getAllPostForDashboard().subscribe(
      (data: PostAdminModel[]) => {
        this.dataSource.data = data.reverse();
      },
      error => {
        console.error('Si è verificato un errore durante il recupero dei post:', error);
      }
    );
  }

  getCommentListLength(element: any): number {
    return element.comments ? element.comments.length : 0;
  }
  
  onRowClicked(element: any){
    this.router.navigate(['/post', element.id]);
  }

  editPost(element: any) {
    // Implementa la logica per l'operazione di modifica
    console.log('Edit post:', element);
  }
  
  deletePost(element: any) {
    // Implementa la logica per l'operazione di eliminazione
    console.log('Delete post:', element);
  }
}
