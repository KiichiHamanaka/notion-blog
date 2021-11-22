import ogp, { OgpParserResult } from "ogp-parser";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

const getMeta = async (url: string): Promise<OgpParserResult> => {
  let meta;
  await ogp(url)
    .then((data) => {
      meta = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return meta;
};

export const getMetas = async (
  blocks: Array<GetBlockResponse>
): Promise<Array<OgpParserResult>> => {
  const bookmarks: Array<any> = blocks.filter(
    (block) => block.type === "bookmark"
  );
  const urls: Array<string> = bookmarks.map((url) => url.bookmark.url);
  const metasPromise = urls.map(async (url) => await getMeta(url));
  return await Promise.all(metasPromise).then(
    (meta: Array<OgpParserResult>) => meta
  );
};
