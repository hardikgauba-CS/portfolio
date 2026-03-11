import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return NextResponse.json(
      { error: 'Missing Instagram access token or user ID.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink&access_token=${accessToken}`
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts: data.data });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts.' },
      { status: 500 }
    );
  }
}
