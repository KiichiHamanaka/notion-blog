import dayjs from "dayjs";
import Link from "next/link";
import { css } from "@emotion/react";

type props = {
  title: string;
  link: string;
  date: string;
  tag: string;
};

const card = css`
  width: 100%;
  margin: 0.5rem;
`;

const small = css`
  font-size: 14px;
`;

const Card = (props: props) => {
  const day = dayjs(props.date).format("YYYY-MM-DD");
  return (
    <div css={card}>
      <Link href={props.link}>
        <a>
          <p>{props.title} </p>
          <p css={small}>{day}</p>
        </a>
      </Link>
    </div>
  );
};

export default Card;
