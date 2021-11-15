import { getBlocks, getDatabase, getPage } from "../util/notion";
import BlogCard from "../components/BlogCard";
import getMeta from "../util/getMeta";

const getMetas = async (blocks) => {
  const bookmarks = blocks.filter((page) => page.type === "bookmark");
  const urls = bookmarks.map((url) => url.bookmark.url);
  const metasPromise = await urls.map(async (url) => await getMeta(url));
  return await Promise.all(metasPromise).then((meta) => meta);
};

const Post = ({ title, blocks, metas }) => {
  let bookmarkCount = 0;

  return (
    <div>
      <title>{title}</title>
      <h3>{title}</h3>
      {blocks.map((page) => {
        if (page.type === "paragraph") {
          return (
            page.paragraph.text.length !== 0 && (
              <p>{page.paragraph.text[0].plain_text}</p>
            )
          );
        } else if (page.type === "bookmark") {
          return <BlogCard meta={metas[bookmarkCount++]} />;
        }
      })}
    </div>
  );
};

export const getStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const title = page.properties.Post.title[0].plain_text;
  const blocks = await getBlocks(id);
  try {
    const metas = await getMetas(blocks);
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
