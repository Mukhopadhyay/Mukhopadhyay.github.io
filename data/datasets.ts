import { Dataset } from "../types/data";

let datasets: Array<Dataset> = [
  //   First one is the highlighted one
  {
    name: "YouTube Thumbnail Dataset",
    description:
      "Most versatile dataset of YouTube thumbnails. Goes hand in hand with the YouTubers-Saying-Things dataset",
    kaggleUrl:
      "https://www.kaggle.com/datasets/praneshmukhopadhyay/youtube-thumbnail-dataset",
    rating: 39,
    ratingType: "upvotes",
  },

  {
    name: "YouTubers Saying Things",
    description:
      "Biggest dataset containing real youtube video's transcripts, alongside other interesting attributes such as Channel type (manually annotated), Channel Name, Views etc",
    kaggleUrl:
      "https://www.kaggle.com/datasets/praneshmukhopadhyay/youtubers-saying-things",
    rating: 34,
    ratingType: "upvotes",
  },

  {
    name: "Amazon Question/Answer Dataset",
    description:
      "Dataset containing Customer question and answers, initially collected by Prof. Julian McAuley. Wrangled and simplied for Kaggle use",
    kaggleUrl:
      "https://www.kaggle.com/datasets/praneshmukhopadhyay/amazon-questionanswer-dataset",
    rating: "10+",
    ratingType: "upvotes",
  },
];

export { datasets };
