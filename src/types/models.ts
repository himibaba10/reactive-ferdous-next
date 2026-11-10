export type ProjectCategory =
  | 'Web Development'
  | 'Graphic Design'
  | 'Figma Design'
  | 'Logo Design'
  | string;

export interface Project {
  _id?: string;
  title: string;
  category: ProjectCategory;
  img: string;
  live?: string;
  frontendCodeLink?: string;
  backendCodeLink?: string;
  technologies?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id?: string;
  quote?: string;
  author?: string;
  role?: string;
  rating?: number | null;
  img?: string;
  createdAt?: string;
}

export interface Logo {
  _id?: string;
  imgUrl: string;
  createdAt?: string;
}

export interface AdminUser {
  _id?: string;
  email: string;
  passwordHash: string;
  createdAt?: string;
}
