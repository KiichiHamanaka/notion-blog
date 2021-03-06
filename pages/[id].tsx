import { getBlocks, getDatabase, getPage } from "../util/notion";
import BlogCard from "../components/BlogCard";
import * as meta from "../util/meta";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { OgpParserResult } from "ogp-parser";
import dayjs from "dayjs";
import PostTitle from "../components/PostTitle";

// type Block = Pick<GetBlockResponse, "type" | "paragraph">;

type bookmark = {};

type props = {
  title: string;
  blocks: Array<GetBlockResponse>;
  date: string;
  metas: Array<OgpParserResult>;
};

const Post = (props: props) => {
  let bookmarkCount = 0;

  return (
    <div>
      <title>{props.title}</title>
      <PostTitle title={props.title} />
      {props.blocks.map((page, index) => {
        if (page.type === "paragraph") {
          return (
            page.paragraph.text.length !== 0 && (
              <p key={index}>{page.paragraph.text[0].plain_text}</p>
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
    const date = dayjs(page.created_time).format("YYYY-MM-DD");
    // @ts-ignore
    const title = page.properties.Post.title[0].plain_text;
    const blocks = await getBlocks(id);
    const metas: Array<OgpParserResult> = await meta.getMetas(blocks);

    return {
      props: {
        blocks,
        title,
        date,
        metas,
      },
      revalidate: 120,
    };
  } catch (error) {
    console.log(error);
  }
};

export default Post;
