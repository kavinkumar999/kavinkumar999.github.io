import React from 'react';
import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    { id: 1, title: 'My First Blog Post', slug: 'my-first-blog-post' },
    { id: 2, title: 'Learning Next.js', slug: 'learning-nextjs' },
    { id: 3, title: 'Web Development Tips', slug: 'web-development-tips' },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul className="space-y-4">
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}