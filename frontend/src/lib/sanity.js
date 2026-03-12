import { createClient } from "@sanity/client";

// Sanity client configuration
// Replace these values with your actual Sanity project details
// You can get these from manage.sanity.io after creating a project
export const sanityClient = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.REACT_APP_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // set to `false` to bypass the edge cache
});

// Helper function to fetch posts
export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    "author": author->{name, avatar},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->title,
    featured
  }`;
  return sanityClient.fetch(query);
}

// Helper function to fetch a single post by slug
export async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    "author": author->{name, avatar, bio},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->{title, slug},
    featured,
    body
  }`;
  return sanityClient.fetch(query, { slug });
}

// Helper function to fetch all categories
export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }`;
  return sanityClient.fetch(query);
}

// Helper function to fetch featured post
export async function getFeaturedPost() {
  const query = `*[_type == "post" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    "author": author->{name, avatar},
    publishedAt,
    "readTime": round(length(pt::text(body)) / 5 / 180 ),
    "category": category->title
  }`;
  return sanityClient.fetch(query);
}

// Image URL builder helper
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
