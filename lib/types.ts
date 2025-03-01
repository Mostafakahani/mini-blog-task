export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface PostWithAuthor extends Post {
  author: string;
}
