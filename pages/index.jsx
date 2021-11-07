import Link from "next/link";
import { getDatabase, getPage } from "../util/notion";

const Home = ({ result }) => {
  return (
    <div>
      <Link href="/portfolio">
        <a>ぽーとふぉりお</a>
      </Link>

      {result.map((page) => {
        return (
          <Link href={`/${page.id}`} key={page.id}>
            <a>{page.properties.Post.title[0].plain_text}</a>
          </Link>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const database = await getDatabase();
  return {
    props: {
      result: database,
    },
    revalidate: 120,
  };
};

export default Home;
