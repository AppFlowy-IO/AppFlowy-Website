import { getAllPosts } from '@/lib/posts';
import RSS from 'rss';

const site_url = process.env.ENVIRONMEN === 'test' ? 'https://test.appflowy.io' : 'https://appflowy.io';

export async function GET() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: 'AppFlowy Blog',
    description: 'Latest updates and insights from AppFlowy',
    site_url: site_url,
    feed_url: `${site_url}/blog/feed.xml`,
    image_url: `${site_url}/appflowy.svg`,
    pubDate: new Date(posts[0].date),
    copyright: `All rights reserved ${new Date().getFullYear()}, AppFlowy`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/blog/${post.slug}`,
      date: new Date(post.date),
      author: post.author,
      categories: post.categories,
      enclosure: post.cover_image
        ? {
            url: post.cover_image.startsWith('http') ? post.cover_image : `${site_url}${post.cover_image}`,
            type: 'image/jpeg', // Adjust based on your image type
          }
        : undefined,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
