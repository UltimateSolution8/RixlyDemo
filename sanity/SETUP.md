# Rixly Sanity Studio Setup Guide

This document provides step-by-step instructions for setting up and deploying the Sanity Studio CMS for Rixly.

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Sanity account (sign up at https://www.sanity.io)

## Quick Start

### Step 1: Navigate to Sanity Directory

```bash
cd LandingNew/sanity
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Initialize Sanity Project

If you don't have a Sanity project yet:

```bash
npx sanity init
```

Follow the prompts:
- Select "Clean project with no predefined schemas"
- Choose "TypeScript" when asked
- When asked about project name, you can use "rixly"

### Step 4: Configure Project ID

After initialization, you'll get a Project ID. Update the configuration:

1. Open `sanity.env` and replace `your-project-id` with your actual project ID:

```typescript
// sanity.env
export const projectId = 'your-actual-project-id'
export const dataset = 'production'
```

2. Also update your frontend environment variables in `LandingNew/frontend/.env`:

```
REACT_APP_SANITY_PROJECT_ID=your-actual-project-id
REACT_APP_SANITY_DATASET=production
```

### Step 5: Run Sanity Studio Locally

```bash
npm run dev
```

The Studio will be available at http://localhost:3000/studio

## Deploying the Studio

### Option 1: Deploy to Sanity Cloud (Recommended)

```bash
npm run deploy
```

This will deploy your Studio to `https://your-project-id.sanity.studio`

### Option 2: Deploy with Custom Domain

You can also deploy to a custom domain:

```bash
npx sanity deploy
```

When prompted, enter your desired hostname (e.g., cms.rixly.com)

## Final Admin URL

After deployment, admins can access the CMS at:

- **Sanity Cloud**: `https://your-project-id.sanity.studio`
- **Custom Domain**: `https://cms.yourdomain.com`

## Creating Content

### 1. Create an Author

1. Go to the **Authors** section in the sidebar
2. Click **Create** 
3. Fill in:
   - Name (required)
   - Slug (auto-generated from name)
   - Image (optional)
   - Bio (optional)
4. Click **Publish**

### 2. Create a Category

1. Go to the **Categories** section
2. Click **Create**
3. Fill in:
   - Title (required)
   - Slug (auto-generated)
   - Description (optional)
4. Click **Publish**

### 3. Create a Blog Post

1. Go to the **Posts** section
2. Click **Create**
3. Fill in the fields:

#### Required Fields:
- **Title** - The post title
- **Slug** - URL-friendly version (auto-generated)
- **Body** - The main content (Portable Text editor)

#### Optional Fields:
- **Excerpt** - Short description for previews
- **Featured Image** - Main image for the post
- **Author** - Reference to an author
- **Category** - Reference to a category
- **Tags** - Array of tags
- **Published at** - Publication date
- **Featured** - Mark as featured post

#### SEO Fields:
- **SEO Title** - Custom title for search engines
- **SEO Description** - Meta description (150-160 chars)
- **OG Image** - Open Graph image for social media

4. Click **Publish** when ready

## Schema Overview

### Post Schema Fields:
- `title` (string, required) - Post title
- `slug` (slug, required) - URL slug (auto-generated)
- `excerpt` (text) - Short description
- `featuredImage` (image) - Main post image with alt text
- `author` (reference) - Link to author document
- `category` (reference) - Link to category document
- `tags` (array) - Array of string tags
- `body` (Portable Text, required) - Rich text content
- `featured` (boolean) - Mark as featured
- `publishedAt` (datetime) - Publication date
- `seoTitle` (string) - SEO title override
- `seoDescription` (text) - SEO meta description
- `ogImage` (image) - Social media image

### Author Schema Fields:
- `name` (string, required) - Author name
- `slug` (slug, required) - URL slug
- `image` (image) - Author photo
- `bio` (text) - Author biography

### Category Schema Fields:
- `title` (string, required) - Category name
- `slug` (slug, required) - URL slug
- `description` (text) - Category description

## Troubleshooting

### Issue: "Cannot find module 'sanity'"
**Solution**: Run `npm install` in the sanity directory

### Issue: "Project ID not found"
**Solution**: Verify your project ID is correctly set in `sanity.env`

### Issue: "Dataset not found"
**Solution**: Make sure you've created a dataset in your Sanity project at manage.sanity.io

### Issue: CORS errors
**Solution**: Add your domain to CORS origins in Sanity manage dashboard

## Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Discord Community](https://www.sanity.io/community)
- [Sanity Studio V3 Guide](https://www.sanity.io/docs/getting-started)

## Notes

- The Studio uses the `production` dataset by default
- All images are automatically optimized through Sanity's CDN
- Portable Text supports rich formatting, images, and code blocks
- SEO fields help improve search engine and social media visibility
