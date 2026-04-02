import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

const POSTS_DIR_CANDIDATES = ["blogs", "data/blogs"];

function resolvePostsDir(): string {
  for (const rel of POSTS_DIR_CANDIDATES) {
    const d = path.join(process.cwd(), rel);
    if (fs.existsSync(d)) return d;
  }
  return path.join(process.cwd(), "blogs");
}

type Frontmatter = {
  title?: string;
  date?: string;
  description?: string;
};

function parseFrontmatter(raw: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  if (!raw.startsWith("---")) return { frontmatter: {}, body: raw };
  const end = raw.indexOf("---", 3);
  if (end === -1) return { frontmatter: {}, body: raw };
  const fmRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const fm: Frontmatter = {};
  fmRaw.split(/\r?\n/).forEach((ln) => {
    const m = ln.match(/^([^:]+):\s*(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      (fm as Record<string, string>)[key] = val;
    }
  });
  return { frontmatter: fm, body };
}

const ADMONITION_TYPES = [
  "note",
  "info",
  "tip",
  "warning",
  "danger",
  "caution",
  "success",
  "abstract",
  "question",
  "bug",
  "example",
  "quote",
];

// Remark plugin: transform :::note / :::warning / etc. container directives
// into <div class="admonition admonition-{type}"> blocks with a title heading.
function remarkCallouts() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, "containerDirective", (node: any) => {
      if (!ADMONITION_TYPES.includes(node.name)) return;

      // Extract optional label (:::note[My Title])
      let titleText = node.name.charAt(0).toUpperCase() + node.name.slice(1);
      let bodyChildren = node.children as any[];

      if (bodyChildren[0]?.type === "directiveLabel") {
        const labelNode = bodyChildren[0];
        titleText =
          labelNode.children?.map((c: any) => c.value ?? "").join("") ||
          titleText;
        bodyChildren = bodyChildren.slice(1);
      }

      node.data = {
        hName: "div",
        hProperties: { className: `admonition admonition-${node.name}` },
      };

      // Prepend a synthetic title node
      node.children = [
        {
          type: "paragraph",
          data: {
            hName: "p",
            hProperties: { className: "admonition-title" },
          },
          children: [{ type: "text", value: titleText }],
        },
        ...bodyChildren,
      ];
    });
  };
}

// Remark plugin: transform ::::tabs / :::tab container directives
// into CSS-interactive tab widgets using data attributes.
let tabGroupCounter = 0;
function remarkTabs() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "tabs") return;

      const groupId = tabGroupCounter++;
      const tabNodes = (node.children as any[]).filter(
        (c: any) => c.type === "containerDirective" && c.name === "tab",
      );

      // Build nav buttons
      const navChildren = tabNodes.map((tab: any, idx: number) => {
        const label =
          (tab.children[0]?.type === "directiveLabel"
            ? tab.children[0].children?.map((c: any) => c.value ?? "").join("")
            : null) ||
          tab.attributes?.title ||
          `Tab ${idx + 1}`;
        return {
          type: "paragraph",
          data: {
            hName: "button",
            hProperties: {
              className: `tab-button${idx === 0 ? " active" : ""}`,
              "data-tab": String(idx),
              "data-group": String(groupId),
              type: "button",
            },
          },
          children: [{ type: "text", value: label }],
        };
      });

      // Build panel divs
      const panelChildren = tabNodes.map((tab: any, idx: number) => {
        const panelBody =
          tab.children[0]?.type === "directiveLabel"
            ? tab.children.slice(1)
            : tab.children;
        return {
          type: "containerDirective",
          name: "__tab-panel__",
          attributes: {},
          children: panelBody,
          data: {
            hName: "div",
            hProperties: {
              className: `tab-panel${idx === 0 ? " active" : ""}`,
              "data-panel": String(idx),
              "data-group": String(groupId),
            },
          },
        };
      });

      node.data = {
        hName: "div",
        hProperties: {
          className: "content-tabs",
          "data-group": String(groupId),
        },
      };

      node.children = [
        {
          type: "containerDirective",
          name: "__tab-nav__",
          attributes: {},
          children: navChildren,
          data: { hName: "div", hProperties: { className: "tab-nav" } },
        },
        {
          type: "containerDirective",
          name: "__tab-panels__",
          attributes: {},
          children: panelChildren,
          data: { hName: "div", hProperties: { className: "tab-panels" } },
        },
      ];
    });
  };
}

async function markdownToHtml(md: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkDirective)
    .use(remarkCallouts)
    .use(remarkTabs)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);

  return String(result);
}

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export function getAllPosts(): PostMeta[] {
  const POSTS_DIR = resolvePostsDir();
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { frontmatter } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, "");
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || "",
      description: frontmatter.description || "",
    };
  });
  posts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
  return posts;
}

export async function getPostBySlug(slug?: string) {
  if (!slug || typeof slug !== "string") return null;
  const slugStr = String(slug);
  const POSTS_DIR = resolvePostsDir();
  let filePath = path.join(POSTS_DIR, `${slugStr}.md`);
  console.log("File path: ", filePath);

  // fallback: try decoded slug and case-insensitive match if direct file missing
  if (!fs.existsSync(filePath)) {
    try {
      const decoded = decodeURIComponent(slug);
      if (decoded && decoded !== slug) {
        const p2 = path.join(POSTS_DIR, `${decoded}.md`);
        if (fs.existsSync(p2)) filePath = p2;
      }
    } catch {
      // ignore decode errors
    }

    if (!fs.existsSync(filePath) && fs.existsSync(POSTS_DIR)) {
      const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
      const lower = slugStr.toLowerCase();
      const match = files.find(
        (f) => f.replace(/\.md$/, "").toLowerCase() === lower,
      );
      if (match) filePath = path.join(POSTS_DIR, match);
    }
  }

  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);
  const html = await markdownToHtml(body);
  return {
    slug: slugStr,
    title: frontmatter.title || slugStr,
    date: frontmatter.date,
    description: frontmatter.description,
    content: html,
  };
}
