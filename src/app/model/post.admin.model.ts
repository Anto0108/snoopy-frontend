export interface PostAdminModel {
    id: number;
    postName: string;
    imageName: string;
    description: string;
    commentList: Comment[];
}
  