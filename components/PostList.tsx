type Post = {
  title: string;
  date?: string;
  description?: string;
  link?: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-col gap-6">
      {posts.map((p, i) => (
        <li key={i}>
          <a href={p.link || "#"} className="group block">
            <div className="text-sm text-zinc-400">{p.date}</div>
            <div className="text-lg font-medium text-white group-hover:underline">
              {p.title}
            </div>
            {p.description && (
              <div className="text-sm text-zinc-400">{p.description}</div>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
