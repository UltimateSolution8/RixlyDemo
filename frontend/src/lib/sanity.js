import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
// Replace these values with your actual Sanity project details
// You can get these from manage.sanity.io after creating a project
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Check if Sanity is properly configured
export function isSanityConfigured() {
  return projectId && projectId !== "your-project-id" && projectId.length > 0;
}

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

// Helper to get image URL from Sanity image object
function getImageUrl(imageObj) {
  if (!imageObj) return null;
  if (imageObj.asset?.url) return imageObj.asset.url;
  if (imageObj.asset) {
    try {
      return builder.image(imageObj).url();
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Helper function to fetch posts
export async function getPosts() {
  // Don't fetch if not configured
  if (!isSanityConfigured()) return [];
  
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "author": author->{name, image},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->title,
    featured,
    seoTitle,
    seoDescription
  }`;
  return sanityClient.fetch(query);
}

// Helper function to fetch a single post by slug
export async function getPost(slug) {
  // Don't fetch if not configured
  if (!isSanityConfigured()) return null;
  
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "author": author->{name, image, bio},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->{title, slug},
    featured,
    body,
    tags,
    seoTitle,
    seoDescription,
    ogImage
  }`;
  return sanityClient.fetch(query, { slug });
}

// Helper function to fetch all categories
export async function getCategories() {
  // Don't fetch if not configured
  if (!isSanityConfigured()) return [];
  
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }`;
  return sanityClient.fetch(query);
}

// Helper function to fetch featured post
export async function getFeaturedPost() {
  // Don't fetch if not configured
  if (!isSanityConfigured()) return null;
  
  const query = `*[_type == "post" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "author": author->{name, image},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->title,
    body
  }`;
  return sanityClient.fetch(query);
}

// Helper function to fetch all authors
export async function getAuthors() {
  // Don't fetch if not configured
  if (!isSanityConfigured()) return [];
  
  const query = `*[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio
  }`;
  return sanityClient.fetch(query);
}

// Export image URL helper
export { getImageUrl };
