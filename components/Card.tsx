import dayjs from "dayjs";
import Link from "next/link";

type props = {
  title: string;
  link: string;
  date: string;
  tag: string;
};

const Card = (props: props) => {
  const day = dayjs(props.date).format("YYYY-MM-DD");
  return (
    <div>
      <Link href={props.link}>
        <a>
          <h3>{props.title}</h3>
          {day}
        </a>
      </Link>
    </div>
  );
};

export default Card;
