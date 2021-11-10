import { getDatabase } from "../util/notion";
import Card from "../components/Card";
const Home = ({ result }) => {
  return (
    <div>
      {result.map((page) => {
        console.dir(page, { depth: null });
        return (
          <Card
            title={page.properties.Post.title[0].plain_text}
            link={`/${page.id}`}
            tag="プログラミング"
            date={page.created_time}
            key={page.id}
          />
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
