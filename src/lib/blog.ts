import { BLOG_CATEGORIES, BLOG_POSTS, QUICK_KRISHI_TIPS } from "@/constants/blogData";
import { BlogPost, QuickKrishiTip } from "@/types/blog";

export interface BlogFilterOptions {
  category?: string;
  search?: string;
}

/**
 * Fetch and filter blog posts on the server.
 */
export function getBlogPosts(options?: BlogFilterOptions): BlogPost[] {
  const { category = "all", search = "" } = options || {};
  const query = search.trim().toLowerCase();

  return BLOG_POSTS.filter((post) => {
    const matchesCategory =
      !category || category === "all" || post.categorySlug === category;

    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.subtitle.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

/**
 * Get featured blog post for spotlight display.
 */
export function getFeaturedBlogPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
}

/**
 * Get single blog post by its slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Get related blog posts excluding current post.
 */
export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/**
 * Get all available blog categories.
 */
export function getBlogCategories() {
  return BLOG_CATEGORIES;
}

/**
 * Get quick agricultural tips.
 */
export function getQuickKrishiTips(): QuickKrishiTip[] {
  return QUICK_KRISHI_TIPS;
}
