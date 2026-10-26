export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogContentSection {
  sectionTitle: string;
  paragraphs: string[];
  tipBox?: string;
  warningBox?: string;
  bulletPoints?: string[];
}

export interface BlogPost {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  author: BlogAuthor;
  image: string;
  excerpt: string;
  featured?: boolean;
  tags?: string[];
  keyTakeaways?: string[];
  sections?: BlogContentSection[];
  content?: string;
  isPublished?: boolean;
  relatedProductCategory?: string;
  relatedCategorySlug?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface QuickKrishiTip {
  id: string;
  title: string;
  summary: string;
  category: string;
  iconName: string;
  badge: string;
}
