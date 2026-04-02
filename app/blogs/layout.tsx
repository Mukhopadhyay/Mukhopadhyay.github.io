import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
