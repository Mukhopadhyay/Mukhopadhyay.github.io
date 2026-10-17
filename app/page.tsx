import { Experience, Project } from "@/types/types";
import ResumeCard from "../components/ResumeCard";
import projectsData from "../data/projects.json";
import experienceData from "../data/experiences.json";
import { getAllPosts } from "@/lib/posts";
import { getReading } from "@/lib/reading";
import Section from "@/components/Section";
import ExperienceList from "@/components/ExperienceList";
import ProjectCard from "@/components/ProjectCard";
import { sortProjects } from "@/lib/projects";
import BlogCard from "@/components/BlogCard";
import { enterAt } from "@/lib/motion";

const HOME_PROJECTS = 2;
const HOME_POSTS = 3;

export default function Home() {
  const projects = sortProjects(projectsData as Project[]);
  const experience = experienceData as Experience[];
  const posts = getAllPosts();
  const nowReading = getReading().current[0];

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <ResumeCard nowReading={nowReading} />

      <Section id="experience" title="Experience" className="enter" style={enterAt(4)}>
        <ExperienceList items={experience} />
      </Section>

      <Section
        id="projects"
        title="Projects"
        className="enter"
        style={enterAt(5)}
        more={
          projects.length > HOME_PROJECTS
            ? { href: "/projects", label: `All projects (${projects.length})` }
            : undefined
        }
      >
        <div className="divide-y divide-border">
          {projects.slice(0, HOME_PROJECTS).map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section
          id="blog"
          title="Blog"
          more={
            posts.length > HOME_POSTS
              ? { href: "/blogs", label: "All posts" }
              : undefined
          }
        >
          <ul className="divide-y divide-border">
            {posts.slice(0, HOME_POSTS).map((p) => (
              <li key={p.slug} className="py-5 first:pt-0 last:pb-0">
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
