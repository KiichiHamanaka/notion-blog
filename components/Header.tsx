import Link from "next/link";
import { css } from "@emotion/react";

const HeaderStyles = css`
  display: flex;
  width: 100%;
  padding: 10px 0 10px 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  font-size: x-large;
  color: white;
  background-color: black;
`;

const Header = () => {
  return (
    <div css={HeaderStyles}>
      <Link href="/">
        <a>俺ブログ</a>
      </Link>
    </div>
  );
};

export default Header;
