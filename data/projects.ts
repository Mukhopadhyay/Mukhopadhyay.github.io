import { Project } from "../types/data";

let projects: Array<Project> = [
  //   First one is the highlighted one
  {
    name: "RestDF",
    description:
      "Create a simple API from a DataFrame, with built-in SwaggerUI support.",
    url: "https://github.com/Mukhopadhyay/restdf",
    rating: 6,
    publishedDate: "Nov, 2021",
    published: true,
    repository: "https://github.com/Mukhopadhyay/restdf",
    documentation: {
      platform: "ReadTheDocs",
      url: "http://restdf.rtfd.io/",
    },
  },
  {
    name: "Monolg",
    description: "An Easy centralized logging for Python using MongoDB",
    url: "https://pypi.org/project/monolg/",
    rating: 6,
    publishedDate: "Dec, 2022",
    published: true,
    repository: "https://github.com/Mukhopadhyay/monolg",
    documentation: {
      platform: "ReadTheDocs",
      url: "https://monolg.readthedocs.io/",
    },
  },
  {
    name: "IPyMarkdown",
    description:
      "An Simple CMA friendly Jupyter notebook to Markdown converter",
    url: "https://github.com/Mukhopadhyay/ipymarkdown",
    published: false,
    repository: "https://github.com/Mukhopadhyay/ipymarkdown",
    documentation: {
      platform: "ReadTheDocs",
      url: "https://ipymarkdown.readthedocs.io/",
    },
  },
  {
    name: "Data-Visualization",
    description: "Documenting python plotting libraries and making them easier",
    url: "https://github.com/Mukhopadhyay/Data-Visualization",
    published: false,
    repository: "https://github.com/Mukhopadhyay/Data-Visualization",
  },
  {
    name: "Open Data",
    description:
      "Open Data is the idea that some data should be freely available to everyone to use, this repository follows this principles and lists all popular open data repositories & datasets",
    url: "https://github.com/Mukhopadhyay/OpenData",
    published: true,
    repository: "https://github.com/Mukhopadhyay/OpenData",
  },
];

export { projects };
