import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Particles from "../components/particles";
import { Github, Mail, Twitter, Kaggle } from "lucide-react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Datasets", href: "/datasets" },
  { name: "Contact", href: "/contacts" },
];

const IndexPage: React.FC<PageProps> = () => {
  return (
    // from-black via-zinc-600/20 to-black
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black">
      <nav className="my-16">
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </a>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        @Mukhopadhyay
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 mx-6">
          Hi, my name is Pranesh Mukhopadhyay, I'm a Data Scientist from Mumbai.
        </h2>

        {/* Resume */}
        <div className="mt-10">
          <a
            download
            href={"./../public/resume/Pranesh-Mukhopadhyay-resume.pdf"}
            className="text-zinc-200 font-bold p-4 border-[1px] border-zinc-200 duration-1000 hover:text-white hover:border-white rounded-full"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Social drawer */}
      <div className="flex flex-row ">
        <span className="relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange">
          <Twitter size={20} />
        </span>
        <span className="relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange">
          <Github size={20} />
        </span>
        <span className="relative mx-5 z-[100] flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-900 border-zinc-500 bg-zinc-900 hover:border-zinc-200 drop-shadow-orange">
          <Mail size={20} />
        </span>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Pranesh M.</title>;
