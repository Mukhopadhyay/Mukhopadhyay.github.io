import { Rss } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    description?: string;
    date?: string;
  };
}

const BlogCard = ({ post, recent }: BlogCardProps & { recent?: boolean }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block py-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium text-foreground group-hover:underline">
          {post.title}
        </div>
        {recent && (
          <div className="flex items-center gap-1">
            <Rss size={14} />
            <p className="text-xs">Blog</p>
          </div>
        )}
      </div>

      {post.description && (
        <div className="text-sm text-foreground/60">{post.description}</div>
      )}
      {post.date && (
        <div className="text-sm text-foreground/60 mt-1">
          {new Date(post.date).toLocaleDateString()}
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
export type { BlogCardProps };
