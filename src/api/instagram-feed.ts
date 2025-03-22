import { NextResponse } from "next/server";

// Instagram Graph API configuration
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

export async function GET() {
  if (!INSTAGRAM_TOKEN || !INSTAGRAM_USER_ID) {
    return NextResponse.json(
      { error: "Instagram API credentials not configured" },
      { status: 500 }
    );
  }

  try {
    // Fetch posts from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,media_url,permalink,caption,timestamp&access_token=${INSTAGRAM_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API returned ${response.status}`);
    }

    const data = await response.json();

    // Format the response
    const posts: InstagramPost[] = data.data.slice(0, 8); // Limit to 8 most recent posts
    return NextResponse.json({
      posts,
    });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
