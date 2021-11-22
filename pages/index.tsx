import { getDatabase } from "../util/notion";
import Card from "../components/Card";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps } from "next";

type props = { database: QueryDatabaseResponse };

const Home = (props: props) => {
  return (
    <div>
      {props.database.results.map((page) => {
        return (
          <Card
            // @ts-ignore
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

export const getStaticProps: GetStaticProps = async () => {
  const database = await getDatabase();
  return {
    props: {
      database,
    },
    revalidate: 120,
  };
};

export default Home;
