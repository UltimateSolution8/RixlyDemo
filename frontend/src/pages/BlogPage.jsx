import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { getPosts, getCategories, getFeaturedPost, sanityClient } from "../lib/sanity";

// Sample fallback posts - used when Sanity is not configured
const samplePosts = [
  {
    id: 1,
    slug: "ai-lead-generation-2024",
    title: "The Future of AI in Lead Generation: Trends to Watch in 2024",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses find and convert leads. From predictive analytics to automated personalization, explore the latest trends shaping the industry.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "AI & Automation",
    featured: true,
  },
  {
    id: 2,
    slug: "b2b-sales-strategies",
    title: "5 proven B2B Sales Strategies That Actually Work in 2024",
    excerpt: "Learn the most effective B2B sales strategies that top-performing companies are using to close more deals and build lasting customer relationships.",
    coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop&q=60",
    author: { name: "Michael Roberts", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Sales",
  },
  {
    id: 3,
    slug: "maximize-roi-outbound",
    title: "How to Maximize Your ROI with Smart Outbound Marketing",
    excerpt: "Outbound marketing doesn't have to be expensive. Learn how to optimize your campaigns for maximum return on investment with data-driven approaches.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    author: { name: "Emily Watson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    category: "Marketing",
  },
  {
    id: 4,
    slug: "lead-quality-vs-quantity",
    title: "Lead Quality vs. Quantity: What Matters More for Growth?",
    excerpt: "The age-old debate continues. We break down the numbers and share insights on finding the perfect balance between lead volume and quality.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    category: "Strategy",
  },
  {
    id: 5,
    slug: "email-outreach-best-practices",
    title: "Email Outreach Best Practices: Get 2x More Responses",
    excerpt: "Master the art of cold email outreach with these proven templates, timing strategies, and personalization techniques that drive results.",
    coverImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop&q=60",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    category: "Email Marketing",
  },
  {
    id: 6,
    slug: "scaling-startup-sales",
    title: "Scaling Your Startup's Sales Team: A Complete Guide",
    excerpt: "From hiring your first salesperson to building a full-fledged sales engine, learn how to scale your startup's sales operations effectively.",
    coverImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60",
    author: { name: "Michael Roberts", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishedAt: "2024-01-03",
    readTime: "12 min read",
    category: "Growth",
  },
];

const defaultCategories = ["All", "AI & Automation", "Sales", "Marketing", "Strategy", "Email Marketing", "Growth"];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sanityConfigured, setSanityConfigured] = useState(false);
  
  const postsPerPage = 6;

  // Check if Sanity is configured and fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
        
        if (projectId && projectId !== "your-project-id") {
          setSanityConfigured(true);
          
          // Fetch posts and categories from Sanity
          const [postsData, categoriesData, featuredData] = await Promise.all([
            getPosts(),
            getCategories(),
            getFeaturedPost()
          ]);
          
          // Transform Sanity data to match our format
          const transformedPosts = postsData.map((post, index) => ({
            id: post._id || index + 1,
            slug: post.slug?.current || `post-${index}`,
            title: post.title,
            excerpt: post.excerpt,
            coverImage: post.coverImage?.asset?.url || samplePosts[index]?.coverImage || "",
            author: post.author || { name: "Unknown Author", avatar: "" },
            publishedAt: post.publishedAt || new Date().toISOString(),
            readTime: post.readTime ? `${post.readTime} min read` : "5 min read",
            category: post.category || "Uncategorized",
            featured: post.featured || false,
          }));
          
          // Transform categories
          const transformedCategories = ["All", ...categoriesData.map(cat => cat.title)];
          
          setPosts(transformedPosts);
          setCategories(transformedCategories.length > 1 ? transformedCategories : defaultCategories);
        } else {
          // Use sample data if Sanity is not configured
          setPosts(samplePosts);
          setCategories(defaultCategories);
        }
      } catch (err) {
        console.error("Error fetching from Sanity:", err);
        setError("Failed to load blog posts. Showing sample content.");
        // Fallback to sample data on error
        setPosts(samplePosts);
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter posts by category and search
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Get featured post (first post with featured: true or first post)
  const featuredPost = posts.find(p => p.featured) || posts[0];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Rixly Blog
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Insights, tips, and strategies to help you grow your business with AI-powered lead generation.
            </p>
            {sanityConfigured && (
              <Link to="/studio">
                <Button variant="outline" className="mt-4 border-white/30 text-white hover:bg-white/10">
                  Manage Content
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 max-w-7xl -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Post */}
      {selectedCategory === "All" && searchQuery === "" && currentPage === 1 && featuredPost && (
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured Article</h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge className="w-fit bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    {featuredPost.author?.avatar && (
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{featuredPost.author?.name}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.publishedAt)}
                        <span className="mx-1">•</span>
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-fit">
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 max-w-7xl mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>

          {currentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {post.author?.avatar && (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {post.author?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No articles found matching your criteria.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-indigo-600 mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={`rounded-full ${
                  currentPage === page ? "bg-indigo-600 hover:bg-indigo-700" : ""
                }`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="container mx-auto px-4 max-w-7xl mt-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
            Subscribe to our newsletter and get the latest articles, tips, and strategies delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
            />
            <Button className="h-12 bg-white text-indigo-600 hover:bg-white/90 font-medium px-8">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
