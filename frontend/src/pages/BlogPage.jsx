import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search, Clock, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { PortableText } from "@portabletext/react";
import { getPosts, getCategories, getFeaturedPost, isSanityConfigured, getImageUrl } from "../lib/sanity";

// Sample fallback posts - used when Sanity is not configured
const samplePosts = [
  {
    id: 1,
    slug: "why-cold-email-is-dead",
    title: "Why Cold Email Is Dead (And What's Quietly Replacing It)",
    excerpt: "The average cold email response rate in 2025 is 1-3%. That means for every 100 emails your team carefully crafts, 97 of them disappear into the void. Meanwhile, a small group of growth teams discovered something quietly powerful.",
    coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop&q=60",
    author: { name: "Rixly Team", avatar: "" },
    publishedAt: "2026-03-13",
    readTime: "8 min read",
    category: "Lead Generation",
    featured: true,
    content: `<h2>The Channel Nobody Is Competing In</h2>
<p>Every day, your ideal buyers open Reddit and do something remarkable: <strong>they ask for help publicly.</strong></p>
<p>They post things like:</p>
<ul>
<li>"We're a 20-person SaaS team outgrowing HubSpot. What are you using for CRM?"</li>
<li>"Our agency needs a tool that does X. Has anyone tried Y or Z?"</li>
<li>"Comparing [Competitor A] vs [Competitor B]. Anyone made this switch recently?"</li>
</ul>
<p>These aren't passive browsers. These are buyers in active decision mode, describing their exact problem, often naming their budget, and asking their community for recommendations.</p>
<p>This is a gold mine. And almost no one is showing up for it.</p>
<h2>What Happens When You Stop Interrupting and Start Listening</h2>
<p>Here's the fundamental shift:</p>
<p><strong>Cold email</strong> = You interrupt a stranger who didn't ask to hear from you, hope they read it, hope your timing is right, hope your offer matches a need they have right now.</p>
<p><strong>Reddit conversation monitoring</strong> = You find someone who already has the problem you solve, already wants help, and is actively asking for it in a public forum.</p>
<p>The intent gap between these two channels is enormous.</p>
<p>Cold email buyers might be interested. Reddit buyers are already looking.</p>
<p>One B2B SaaS startup using Rixly closed <strong>6 demos in 30 days</strong> purely from Reddit conversations, generating <strong>$8,000 in pipeline</strong> without running a single ad or sending a single cold email.</p>
<h2>Why Reddit Converts Better Than You'd Expect</h2>
<p>Reddit's reputation as a "weird internet forum" has kept most B2B marketers away. That's actually the opportunity.</p>
<table>
<tr><th>Channel</th><th>Cost</th><th>Intent Level</th><th>Competition</th></tr>
<tr><td>Cold Email</td><td>Medium</td><td>Low</td><td>Very High</td></tr>
<tr><td>LinkedIn Ads</td><td>High</td><td>Medium</td><td>High</td></tr>
<tr><td>Reddit Conversations</td><td>Low</td><td><strong>High</strong></td><td><strong>Low</strong></td></tr>
</table>
<p>Reddit users are notoriously sceptic of overt marketing, which means the bar for authentic, valuable engagement is higher, but the reward is proportionally bigger.</p>
<p><strong>Reddit threads rank on Google.</strong> When someone Googles "best CRM for small SaaS teams," they often land on a Reddit thread. Your presence in that thread is SEO exposure, brand awareness, and lead generation all in one comment.</p>
<h2>The Problem With Doing This Manually</h2>
<p>The logic is simple. The execution is painful.</p>
<p>To monitor Reddit conversations manually, you'd need to:</p>
<ol>
<li>Identify every relevant subreddit for your ICP (there are often 15 to 30 of them)</li>
<li>Check each one multiple times per day for new posts</li>
<li>Filter out noise to find genuinely high-intent conversations</li>
<li>Craft responses that are helpful enough to be upvoted and not flagged as spam</li>
<li>Track which conversations led to clicks, demos, or deals</li>
<li>Do this across your entire team, consistently, every single day</li>
</ol>
<p>Most teams try this for two weeks, burn out, and go back to cold email.</p>
<h2>How Rixly Changes the Equation</h2>
<p><strong>Step 1: Monitor</strong><br/>Tell Rixly which subreddits matter for your business. It watches them in real time and surfaces conversations where your ideal buyer is showing purchase intent.</p>
<p><strong>Step 2: Engage</strong><br/>Rixly's AI suggests contextual replies for each conversation, responses that add real value, fit the tone of the community, and don't violate platform rules. You review, edit, and post. You stay in control.</p>
<p><strong>Step 3: Convert</strong><br/>Every engagement is tracked with CRM-connected links. You see exactly which conversations turned into clicks, demo bookings, and pipeline.</p>
<h2>This Isn't Scraping. It Isn't Spam.</h2>
<p>Rixly is not a scraping tool. It doesn't automate mass replies. It doesn't blast comments across subreddits. Every response is reviewed and posted by a real person on your team.</p>
<p>This is a strategic position. Brands that try to automate Reddit spam get banned fast. The companies quietly winning on Reddit are the ones who show up like a knowledgeable human, not a bot.</p>
<h2>The Bottom Line</h2>
<p>Cold email had a good run. The playbook worked when inboxes weren't saturated, when personalization was rare, when buyers hadn't yet learned to filter out outreach on sight.</p>
<p><strong>That era is over.</strong></p>
<p>The teams winning at lead generation in 2025 aren't the ones with the cleverest email sequences. They're the ones who stopped shouting and started listening.</p>
<p>Reddit is the clearest example of this shift. It's underpriced, undercompeted, and loaded with high-intent buyers who want to be helped.</p>
<p>The only question is whether you find them before your competitors do.</p>`,
  },
];

const defaultCategories = ["All", "Lead Generation", "AI & Automation", "Sales", "Marketing"];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sanityConfigured, setSanityConfigured] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  
  const postsPerPage = 6;

  // Check if Sanity is configured and fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const sanityIsConfigured = isSanityConfigured();
        
        if (sanityIsConfigured) {
          setSanityConfigured(true);
          
          // Fetch posts and categories from Sanity
          const [postsData, categoriesData] = await Promise.all([
            getPosts(),
            getCategories()
          ]);
          
          // Transform Sanity data to match our format
          const transformedPosts = postsData.map((post, index) => ({
            id: post._id || index + 1,
            slug: post.slug?.current || `post-${index}`,
            title: post.title,
            excerpt: post.excerpt,
            // Use featuredImage from Sanity (schema field name)
            coverImage: getImageUrl(post.featuredImage) || samplePosts[index]?.coverImage || "",
            author: post.author ? {
              name: post.author.name,
              avatar: getImageUrl(post.author.image) || ""
            } : { name: "Rixly Team", avatar: "" },
            publishedAt: post.publishedAt || new Date().toISOString(),
            readTime: post.readTime ? `${post.readTime} min read` : "5 min read",
            category: post.category || "Uncategorized",
            featured: post.featured || false,
            // Include body for full post view
            body: post.body,
          }));
          
          // Transform categories
          const transformedCategories = ["All", ...categoriesData.map(cat => cat.title)];
          
          setPosts(transformedPosts);
          setCategories(transformedCategories.length > 1 ? transformedCategories : defaultCategories);
        } else {
          // Use sample data if Sanity is not configured
          setSanityConfigured(false);
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
      {selectedCategory === "All" && searchQuery === "" && currentPage === 1 && featuredPost && !expandedPost && (
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
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-fit"
                    onClick={() => setExpandedPost(featuredPost)}
                  >
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Expanded Blog Post View */}
      {expandedPost && (
        <div className="container mx-auto px-4 max-w-4xl mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpandedPost(null)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Cover Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={expandedPost.coverImage}
                alt={expandedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="w-fit bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
                  {expandedPost.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {expandedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <span>{expandedPost.author?.name}</span>
                  <span>•</span>
                  <span>{formatDate(expandedPost.publishedAt)}</span>
                  <span>•</span>
                  <span>{expandedPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-8 md:p-12">
              {/* Introduction */}
              <div className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-medium">
                {expandedPost.excerpt}
              </div>
              
              {/* Full Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* If body contains Portable Text from Sanity, render it */}
                {expandedPost.body ? (
                  <PortableText 
                    value={expandedPost.body}
                    components={{
                      block: {
                        h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                        normal: ({children}) => <p className="mb-4">{children}</p>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4">{children}</blockquote>,
                      },
                      list: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                      listItem: ({children}) => <li className="mb-2">{children}</li>,
                      marks: {
                        link: ({children, value}) => {
                          const rel = value.blank ? 'noopener noreferrer' : undefined;
                          const target = value.blank ? '_blank' : undefined;
                          return <a href={value.href} rel={rel} target={target} className="text-indigo-600 hover:underline">{children}</a>;
                        },
                      },
                    }}
                  />
                ) : (
                  // Fallback to HTML content for sample posts
                  <div dangerouslySetInnerHTML={{ __html: expandedPost.content }} />
                )}
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-xl p-8 text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to find high-intent leads?</h3>
                  <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                    Start monitoring Reddit conversations where your ideal buyers are actively asking for help.
                  </p>
                  <Button className="bg-white text-indigo-600 hover:bg-white/90 font-medium px-8">
                    Start Free Trial
                  </Button>
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
