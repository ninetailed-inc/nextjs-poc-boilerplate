import { ContentfulClientApi, createClient } from "contentful";
import {
  ExperienceMapper,
  ExperimentEntry,
  isEntry,
} from "@ninetailed/experience.js-utils-contentful";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_TOKEN ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN ?? "",
  host: "preview.contentful.com",
});

const getClient = (preview: boolean): ContentfulClientApi => {
  return preview ? previewClient : contentfulClient;
};

const getPageQuery = (pageParams) => {
  return {
    limit: 1,
    include: 10,
    "fields.slug": pageParams.slug, // TODO: Change me, depending on the field we're querying
    content_type: pageParams.pageContentType,
  };
};

export async function getPage(pageParams) {
  const query = getPageQuery(pageParams);
  const client = getClient(!!pageParams.preview);
  const entries = await client.getEntries(query);
  const [page] = entries.items;
  return page;
}

// Useful if demonstrating getStaticPaths for multiple pages
// const getPagesOfTypeQuery = (pageParams) => {
//   return {
//     limit: 100,
//     content_type: pageParams.pageContentType,
//   };
// };

// export async function getPagesOfType(pageParams) {
//   const query = getPagesOfTypeQuery(pageParams);
//   const client = getClient(!!pageParams.preview);
//   const entries = await client.getEntries(query);
//   const pages = entries.items;

//   return pages || [];
// }

export async function getExperiments() {
  const query = {
    content_type: "nt_experience",
    "fields.nt_type": "nt_experiment",
  };
  const client = getClient(false);
  const entries = await client.getEntries(query);
  const experiments = entries.items as ExperimentEntry[];

  const mappedExperiments = (experiments || []).filter(isEntry).map((entry) => {
    return ExperienceMapper.mapExperiment(entry);
  });

  return mappedExperiments;
}
