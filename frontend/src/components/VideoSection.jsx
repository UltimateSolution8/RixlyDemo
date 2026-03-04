import { motion } from "framer-motion";
import { Play, Pause, MessageCircle, ArrowUp, ThumbsUp } from "lucide-react";
import { useState, useRef } from "react";

const mockRedditPosts = [
  {
    subreddit: "r/SaaS",
    title: "Looking for project management tool - what do you all use?",
    relevance: "98%",
    comments: 47,
    upvotes: 124,
  },
  {
    subreddit: "r/startups",
    title: "Best CRM for early stage startup? Need something affordable",
    relevance: "95%",
    comments: 32,
    upvotes: 89,
  },
  {
    subreddit: "r/B2B",
    title: "How do you handle lead generation? Cold outreach not working",
    relevance: "92%",
    comments: 56,
    upvotes: 201,
  },
];

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="video"
      className="py-24 md:py-32 relative"
      data-testid="video-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            data-testid="video-title"
          >
            See Rixly in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how businesses are transforming their lead generation with our
            AI-powered platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="video-container aspect-video rounded-2xl overflow-hidden bg-card border border-border/50">
            {/* Video element with sample video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop"
              data-testid="walkthrough-video"
              onEnded={() => setIsPlaying(false)}
            >
              <source
                src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-300 group"
              data-testid="video-play-button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-primary"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Reddit Post Mockups - positioned below video */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {mockRedditPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer"
              >
                {/* Subreddit */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary">{post.subreddit}</span>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                    {post.relevance} match
                  </span>
                </div>
                
                {/* Title */}
                <h4 className="font-medium text-sm mb-3 line-clamp-2">
                  {post.title}
                </h4>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    <span>{post.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
