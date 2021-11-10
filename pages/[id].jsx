import { getBlocks, getDatabase, getPage } from "../util/notion";

const Post = ({ title, blocks }) => {
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
  const blocks = await getBlocks(id);
  // mapの中でh3とか判定してcaseでreturnすれば？
  // const chooseOne = page.find((element) => element.id === id);
  console.dir(page, { depth: null });

  const title = page.properties.Post.title[0].plain_text;
  return {
    props: {
      blocks,
      title,
    },
    revalidate: 120,
  };
};

export default Post;
