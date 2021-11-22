import { getBlocks, getDatabase, getPage } from "../util/notion";
import BlogCard from "../components/BlogCard";
import * as meta from "../util/meta";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { OgpParserResult } from "ogp-parser";

// type Block = Pick<GetBlockResponse, "type" | "paragraph">;

type bookmark = {};

type props = {
  title: string;
  blocks: Array<GetBlockResponse>;
  metas: Array<OgpParserResult>;
};

const Post = (props: props) => {
  let bookmarkCount = 0;

  return (
    <div>
      <title>{props.title}</title>
      <h3>{props.title}</h3>
      {props.blocks.map((page) => {
        if (page.type === "paragraph") {
          return (
            page.paragraph.text.length !== 0 && (
              <p>{page.paragraph.text[0].plain_text}</p>
            )
          );
        } else if (page.type === "bookmark") {
          return <BlogCard meta={props.metas[bookmarkCount++]} />;
        }
      })}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.results.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  try {
    const { id } = context.params;
    const page = await getPage(id);
    const title = page.properties.Post.title[0].plain_text;
    const blocks = await getBlocks(id);
    const metas: Array<OgpParserResult> = await meta.getMetas(blocks);

    return {
      props: {
        blocks,
        title,
        metas,
      },
      revalidate: 120,
    };
  } catch (error) {
    console.log(error);
  }
};

export default Post;
