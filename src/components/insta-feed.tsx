import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  
  const instagramUsername = "your_instagram_handle"; // Replace with your actual handle

  useEffect(() => {
    // This is where we would fetch from Instagram API
    // For now, we'll simulate a fetch with placeholder data
    const fetchInstagramPosts = async () => {
      try {
        // In a real implementation, you would use:
        // const response = await fetch('/api/instagram-feed');
        // const data = await response.json();
        
        // Simulated data for demonstration
        const mockPosts: InstagramPost[] = Array.from({ length: 8 }).map((_, i) => ({
          id: `post-${i}`,
          media_url: `/instagram-${i + 1}.jpg`, // These would be real Instagram image URLs in the actual API
          permalink: `https://instagram.com/p/mock${i}`,
          caption: `Instagram post caption ${i + 1}`,
          timestamp: new Date().toISOString()
        }));
        
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 500); // Simulate loading
      } catch (err) {
        setError("Failed to load Instagram posts");
        setLoading(false);
        console.error("Error fetching Instagram posts:", err);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section 
      className="py-16"
      style={{ 
        backgroundColor: theme.background.primary,
        fontFamily: theme.fonts.body
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 
            className="text-3xl font-bold"
            style={{ 
              fontFamily: theme.fonts.heading,
              color: theme.text.primary
            }}
          >
            Instagram Feed
          </h2>
          <Button 
            asChild 
            variant="outline"
            style={{ 
              borderColor: theme.border.medium,
              color: theme.text.primary 
            }}
          >
            <Link href={`https://instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              Follow Me
            </Link>
          </Button>
        </div>
        
        {loading && (
          <div 
            className="text-center py-8"
            style={{ color: theme.text.secondary }}
          >
            <p>Loading Instagram feed...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <Link 
                href={post.permalink} 
                key={post.id} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image 
                    src={post.media_url}
                    alt={post.caption}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
