import { Client } from "@notionhq/client";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    filter: {
      or: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  return response;
};

export const getPage = async (pid): Promise<CreatePageResponse> => {
  return await notion.pages.retrieve({ page_id: pid });
};

export const getBlocks = async (bid) => {
  const response = await notion.blocks.children.list({
    block_id: bid,
  });
  return response.results;
};
