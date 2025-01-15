import { getAllPosts } from '@/lib/posts';
import RSS from 'rss';

const site_url = process.env.ENVIRONMENT === 'test' ? 'https://test.appflowy.com' : 'https://appflowy.com';

export async function GET() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: 'AppFlowy Blog | In the Flow',
    description:
      'Receive the latest updates and tips from AppFlowy. Offline mode, self-hosting, iOS and Android, Markdown editing, GPT-4, Claude, Llama, and team collaboration.',
    site_url: site_url,
    feed_url: `${site_url}/blog/feed.xml`,
    image_url: `${site_url}/appflowy-rss-logo.png`,
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
      enclosure: post.thumb_image
        ? {
            url: post.thumb_image.startsWith('http') ? post.thumb_image : `${site_url}${post.thumb_image}`,
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
