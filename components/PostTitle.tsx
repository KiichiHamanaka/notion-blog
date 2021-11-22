import { css } from "@emotion/react";

type props = {
  title: string;
};

const titleStyles = css`
  font-size: 42px;
`;

const PostTitle = (props: props) => {
  return (
    <div>
      <p css={titleStyles}>{props.title}</p>
    </div>
  );
};

export default PostTitle;
