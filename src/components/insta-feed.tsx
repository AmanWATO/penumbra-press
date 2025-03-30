/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();

  const instagramUsername = "wordsinshade";

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(
          "https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/user_posts?username_or_id=wordsinshade&count=6",
          {
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
              "X-RapidAPI-Host": "real-time-instagram-scraper-api1.p.rapidapi.com",
            },
          }
        );
      
        const data = await response.json();
        
      

        console.log({data})
      
        const userData = data.data.user;
        const mediaData = data.data.items;
      
        const posts: InstagramPost[] = mediaData.map((post: any) => ({
          id: post.id,
          media_url: post.image_versions2.candidates[0].url,
          permalink: `https://www.instagram.com/p/${post.code}/`,
          caption: post.caption?.text || "", 
          timestamp: post.taken_at,
        }));
      
        setPosts(posts);
        setProfileImage(userData.profile_pic_url);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Instagram posts");
        setLoading(false);
        console.error(err);
      }
    };

    fetchInstagramPosts();
  }, []); // Runs only on mount

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: theme.background.primary,
        fontFamily: theme.fonts.body,
      }}
      id="instagram-feed"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {profileImage && (
              <div className="relative h-10 w-10 max-md:w-7 max-md:h-7 rounded-full overflow-hidden">
                <Image
                  src={profileImage}
                  alt={`${instagramUsername} profile picture`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h2
              className="text-3xl max-md:text-xl font-bold"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.text.primary,
              }}
            >
              Instagram Feed
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            style={{
              borderColor: theme.border.medium,
              color: theme.text.primary,
            }}
          >
            <Link
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              <p className="max-md:hidden" >Follow Me</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
